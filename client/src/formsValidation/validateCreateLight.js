export default function validateCreateLightForm(formValues, light, adjustable, integratedLed) {
    const allErrors = {};

    if (formValues.name == '') {
        allErrors.name = 'Name field is required';
    }

    if (formValues.price == '') {
        allErrors.price = 'Price field is required';
    }

    if (formValues.quantities == '') {
      allErrors.quantities = 'Quantities field is required';
    }

    if (formValues.date == '') {
        allErrors.date = 'Date field is required';
    } else {
        const currDate = new Date();
        const dateProvided = new Date(formValues.date);

        if (currDate <= dateProvided) {
            allErrors.date = 'Date is not valid';
        }
    }

    if (formValues.dimensions == '') {
        allErrors.dimensions = 'Dimensions field is required';
    } else {
        const result = formValues.dimensions.match(/^\d+\/\d+\/\d+$/);

        if (!result) {
            allErrors.dimensions = 'Dimensions is not valid';
        }
    }
    
    if (!light && formValues.imageURL == '') {
        allErrors.imageURL = 'Image is required';
    }

    if (adjustable == true) {
      if (formValues.minHeight == '') {
        allErrors.minHeight = 'Min field is required';
      }
      
      if (formValues.maxHeight == '') {
        allErrors.maxHeight = 'Max field is required';
      }
    //   } else {
    //     data.minHeight = formValues.minHeight;
    //     data.maxHeight = formValues.maxHeight;
    //   }
    // } else {
    //   data.minHeight = '';
    //   data.maxHeight = '';
    }

    if (integratedLed == null) {
      allErrors.integratedLed = 'Integrated LED option is required';
    } else if (integratedLed == true) {
      if (formValues.kelvins == '' ) {
        allErrors.kelvins = 'Kelvins field is required';
      }

      if (formValues.lumens == '' ) {
        allErrors.lumens = 'Lumens field is required';
      }

      if (formValues.watt == '' ) {
        allErrors.watt = 'Watt field is required';
      }
     // data.kelvins = formValues.kelvins;
      //data.lumens = formValues.lumens;
      //data.watt = formValues.watt;
     // data.bulbType = '';
      //data.bulbsRequired = '';
    } else {
        if (formValues.bulbType == '' ) {
            allErrors.bulbType = 'Bulb type field is required';
        }
        
        if (formValues.bulbsRequired == '' ) {
            allErrors.bulbsRequired = 'Number of bulbs field is required';
        }
     // data.bulbType = formValues.bulbType;
     // data.bulbsRequired = formValues.bulbsRequired;

    //  data.kelvins = '';
     // data.lumens = '';
     // data.watt = '';
    }

    if (formValues.notes != '') {
      if (formValues.notes.length > 30) {
        allErrors.notes = 'Notes should be maximum 30 symbols';
      }

    }

    return allErrors;
}