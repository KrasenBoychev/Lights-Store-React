export default function validateCreateLightForm(
  data,
  light,
  adjustable,
  integratedLed
) {

  const allErrors = {};

  if (data.name == '') {
    allErrors.name = 'Name field is required';
  }

  if (data.price == '') {
    allErrors.price = 'Price field is required';
  } else {
    if (Number(data.price) <= 0) {
      allErrors.price = 'Price field should be a positive number';
    }
  }

  if (data.quantities == '') {
    allErrors.quantities = 'Quantities field is required';
  } else {
    if (Number(data.quantities) <= 0) {
      allErrors.quantities = 'Quantities field should be a positive number';
    }
  }

  if (data.date == '') {
    allErrors.date = 'Date field is required';
  } else {
    const currDate = new Date();
    const dateProvided = new Date(data.date);

    if (currDate <= dateProvided) {
      allErrors.date = 'Date is not valid';
    }
  }

  if (data.dimensions == '') {
    allErrors.dimensions = 'Dimensions field is required';
  } else {
    const result = data.dimensions.match(/^\d+\/\d+\/\d+$/);

    if (!result) {
      allErrors.dimensions = 'Dimensions is not valid';
    } else {
      const [h, w, d] = result[0].split('/');

      if (Number(h) <= 0 || Number(w) <= 0 || Number(d) <= 0) {
        allErrors.dimensions = 'Dimensions should consists of positive numbers';
      }
    }
  }

  if (light.imageURL == '' && data.imageURL == '') {
    allErrors.imageURL = 'Image is required';
  }

  if (adjustable == true) {
    if (data.minHeight == '' || data.minHeight == null) {
      allErrors.minHeight = 'Min field is required';
    } else {
      if (Number(data.minHeight) <= 0) {
        allErrors.minHeight = 'Min field should be a positive number';
      }
    }

    if (data.maxHeight == '' || data.maxHeight == null) {
      allErrors.maxHeight = 'Max field is required';
    } else if (Number(data.maxHeight) <= 0) {
      allErrors.maxHeight = 'Max field should be a positive number';
    } else {
      if (data.minHeight && data.maxHeight <= data.minHeight) {
        allErrors.maxHeight = 'Max height should be greater than min height';
      }
    }
  } else {
    data.minHeight = '';
    data.maxHeight = '';
  }

  if (integratedLed == null) {
    allErrors.integratedLed = 'Integrated LED option is required';
  } else if (integratedLed == true) {
    if (data.kelvins == '' || data.kelvins == null) {
      allErrors.kelvins = 'Kelvins field is required';
    } else {

      if ( Number(data.kelvins) < 2700 || Number(data.kelvins) > 6500) {
        allErrors.kelvins = 'Kelvins field should be between 2700 and 6500';
      }
    }

    if (data.lumens == '' || data.lumens == null) {
      allErrors.lumens = 'Lumens field is required';
    } else {
      if (Number(data.lumens) <= 0) {
        allErrors.lumens = 'Lumens field should be a positive number';
      }
    }

    if (data.watt == '' || data.watt == null) {
      allErrors.watt = 'Watt field is required';
    } else {
      if (Number(data.watt) <= 0) {
        allErrors.watt = 'Watt field should be a positive number';
      }
    }

    data.bulbType = '';
    data.bulbsRequired = '';
  } else {
    if (data.bulbType == '' || data.bulbType == null) {
      allErrors.bulbType = 'Bulb type field is required';
    }

    if (data.bulbsRequired == '' || data.bulbsRequired == null) {
      allErrors.bulbsRequired = 'Number of bulbs field is required';
    } else {
      if (Number(data.bulbsRequired) <= 0) {
        allErrors.bulbsRequired =
          'Number of bulbs field should be a positive number';
      }
    }

    data.kelvins = '';
    data.lumens = '';
    data.watt = '';
  }

  if (!data.notes) {
    data.notes = '';
  }

  if (data.notes != '') {
    if (data.notes.length > 30) {
      allErrors.notes = 'Notes should be maximum 30 symbols';
    }
  }

  return allErrors;
}
