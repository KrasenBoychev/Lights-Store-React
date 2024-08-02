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
  }

  if (data.quantities == '') {
    allErrors.quantities = 'Quantities field is required';
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
    }
  }

  if (!light && data.imageURL == '') {
    allErrors.imageURL = 'Image is required';
  }

  if (adjustable == true) {
    if (data.minHeight == '') {
      allErrors.minHeight = 'Min field is required';
    }

    if (data.maxHeight == '') {
      allErrors.maxHeight = 'Max field is required';
    }
  } else {
    data.minHeight = '';
    data.maxHeight = '';
  }

  if (integratedLed == null) {
    allErrors.integratedLed = 'Integrated LED option is required';
  } else if (integratedLed == true) {
    if (data.kelvins == '') {
      allErrors.kelvins = 'Kelvins field is required';
    }

    if (data.lumens == '') {
      allErrors.lumens = 'Lumens field is required';
    }

    if (data.watt == '') {
      allErrors.watt = 'Watt field is required';
    }

    data.bulbType = '';
    data.bulbsRequired = '';
  } else {
    if (data.bulbType == '') {
      allErrors.bulbType = 'Bulb type field is required';
    }

    if (data.bulbsRequired == '') {
      allErrors.bulbsRequired = 'Number of bulbs field is required';
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
