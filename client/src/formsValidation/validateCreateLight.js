import { bulbTypes } from '../common/bulbTypes';

export default function validateCreateLightForm(
  data,
  light,
  adjustable,
  integratedLed,
  bulbTypeState
) {

  const allErrors = {};

  name(data, allErrors);
  price(data, allErrors);
  quantities(data, allErrors);
  date(data, allErrors);
  dimensions(data, allErrors, adjustable);
  image(data, allErrors, light);
  isIntegratedLed(data, allErrors, integratedLed, bulbTypeState);
  notes(data, allErrors);

  if (Object.entries(allErrors).length == 0) {
    data.price = Number(data.price).toFixed(2);
    data.quantities = Math.floor(Number(data.quantities));
    data.height = Number(data.height).toFixed(2);
    data.width = Number(data.width).toFixed(2);
    data.depth = Number(data.depth).toFixed(2);

    if (!adjustable) {
      data.maxHeight = '';
    } else {
      data.maxHeight = Number(data.maxHeight).toFixed(2);
    }

    if (integratedLed) {
      data.kelvins = Math.floor(Number(data.kelvins));
      data.lumens = Math.floor(Number(data.lumens));
      data.watt = Math.floor(Number(data.watt));

      data.bulbType = '';
      data.bulbsRequired = '';
    } else {
      data.bulbType = bulbTypeState;
      data.bulbsRequired = Math.floor(Number(data.bulbsRequired));

      data.kelvins = '';
      data.lumens = '';
      data.watt = '';
    }
  }

  return allErrors;
}


function name(data, allErrors) {
  if (data.name == '') {
    allErrors.name = 'Name is required';
  }
}

function price(data, allErrors) {
  if (data.price == '') {
    allErrors.price = 'Price is required';
  } else {
    if (Number(data.price) <= 0) {
      allErrors.price = 'Price should be a positive number';
    }
  }
}

function quantities(data, allErrors) {
  if (data.quantities == '') {
    allErrors.quantities = 'Quantities is required';
  } else {
    if (Number(data.quantities) <= 0) {
      allErrors.quantities = 'Quantities should be a positive number';
    } else if (Number(data.quantities) % 1 != 0) {
      allErrors.quantities = 'Quantities should be an integer';
    }
  }
}

function date(data, allErrors) {
  if (data.date == '') {
    allErrors.date = 'Date is required';
  } else {
    const currDate = new Date();
    const dateProvided = new Date(data.date);

    if (currDate <= dateProvided) {
      allErrors.date = 'Date is not valid';
    }
  }
}

function dimensions(data, allErrors, adjustable) {
  if (data.height == '') {
    allErrors.height = 'Height is required';
  } else if (Number(data.height) <= 0) {
    allErrors.height = 'Height should be a positive number';
  }

  if (adjustable) {
    if (data.maxHeight == '' || data.maxHeight == null) {
      allErrors.maxHeight = 'Max height is required';
    } else if (Number(data.maxHeight) <= 0) {
      allErrors.maxHeight = 'Max height should be a positive number';
    } else {
      if (Number(data.height) >= Number(data.maxHeight)) {
        allErrors.maxHeight = 'Max height should be greater than min height';
      }
    }
  }

  if (data.width == '') {
    allErrors.width = 'Width is required';
  } else if (Number(data.width) <= 0) {
    allErrors.width = 'Width should be a positive number';
  }

  if (data.depth == '') {
    allErrors.depth = 'Depth is required';
  } else if (Number(data.depth) <= 0) {
    allErrors.depth = 'Depth should be a positive number';
  }
}

function image(data, allErrors, light) {
  if (light.imageURL == '' && data.imageURL == '') {
    allErrors.imageURL = 'Image is required';
  }
}

function isIntegratedLed(data, allErrors, integratedLed, bulbTypeState) {
  if (integratedLed == null) {
    allErrors.integratedLed = 'Integrated LED option is required';
  } 
  
  if (integratedLed) {
    kelvins();
    lumens();
    watt();
  } else {
    bulbs();
  }

  function kelvins() {
    if (data.kelvins == '' || data.kelvins == null) {
      allErrors.kelvins = 'Kelvins is required';
    } else {

      if ( Number(data.kelvins) < 2700 || Number(data.kelvins) > 6500) {
        allErrors.kelvins = 'Kelvins should be between 2700 and 6500';
      } else if (Number(data.kelvins) % 1 != 0) {
        allErrors.kelvins = 'Kelvins should be an integer';
      }
    }
  }

  function lumens() {
    if (data.lumens == '' || data.lumens == null) {
      allErrors.lumens = 'Lumens is required';
    } else {
      if (Number(data.lumens) <= 0) {
        allErrors.lumens = 'Lumens should be a positive number';
      } else if (Number(data.lumens) % 1 != 0) {
        allErrors.lumens = 'Lumens should be an integer';
      }
    }
  }

  function watt() {
    if (data.watt == '' || data.watt == null) {
      allErrors.watt = 'Watt is required';
    } else {
      if (Number(data.watt) <= 0) {
        allErrors.watt = 'Watt should be a positive number';
      } else if (Number(data.watt) % 1 != 0) {
        allErrors.watt = 'Watt should be an integer';
      }
    }
  }

  function bulbs() {
    if (bulbTypeState == '' || bulbTypeState == null) {
      allErrors.bulbType = 'Bulb type is required';
    } else if (!bulbTypes.includes(bulbTypeState)) {
      allErrors.bulbType = 'Bulb type is not valid, please select an option from the list above';
    }

    if (data.bulbsRequired == '' || data.bulbsRequired == null) {
      allErrors.bulbsRequired = 'Number of bulbs  is required';
    } else {
      if (Number(data.bulbsRequired) <= 0) {
        allErrors.bulbsRequired =
          'Number of bulbs should be a positive number';
      } else if (Number(data.bulbsRequired) % 1 != 0) {
        allErrors.bulbsRequired =
        'Number of bulbs should be an integer';
      }
    }
  }
}

function notes(data, allErrors) {
  if (!data.notes) {
    data.notes = '';
  }

  if (data.notes != '') {
    if (data.notes.length > 30) {
      allErrors.notes = 'Notes should be maximum 30 symbols';
    }
  }
}