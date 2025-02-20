import { bulbTypes } from "../common/bulbTypes";

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
      data.maxHeight = "";
    } else {
      data.maxHeight = Number(data.maxHeight).toFixed(2);
    }

    if (integratedLed) {
      data.kelvins = Math.floor(Number(data.kelvins));
      data.lumens = Math.floor(Number(data.lumens));
      data.watt = Math.floor(Number(data.watt));

      data.bulbType = "";
      data.bulbsRequired = "";
    } else {
      data.bulbType = bulbTypeState;
      data.bulbsRequired = Math.floor(Number(data.bulbsRequired));

      data.kelvins = "";
      data.lumens = "";
      data.watt = "";
    }
  }

  return allErrors;
}

function name(data, allErrors) {
  if (data.name == "") {
    allErrors.name = true;
  }
}

function price(data, allErrors) {
  if (data.price == "" || Number(data.price) <= 0) {
    allErrors.price = true;
  }
}

function quantities(data, allErrors) {
  if (
    data.quantities == "" ||
    Number(data.quantities) <= 0 ||
    Number(data.quantities) % 1 != 0
  ) {
    allErrors.quantities = true;
  }
}

function date(data, allErrors) {
  if (data.date == "") {
    allErrors.date = true;
  } else {
    const currDate = new Date();
    const dateProvided = new Date(data.date);

    if (currDate <= dateProvided) {
      allErrors.date = true;
    }
  }
}

function dimensions(data, allErrors, adjustable) {
  if (data.height == "" || Number(data.height) <= 0) {
    allErrors.height = true;
  }

  if (adjustable) {
    if (
      data.maxHeight == "" ||
      data.maxHeight == null ||
      Number(data.maxHeight) <= 0 ||
      Number(data.height) >= Number(data.maxHeight)
    ) {
      allErrors.maxHeight = true;
    }
  }

  if (data.width == "" || Number(data.width) <= 0) {
    allErrors.width = true;
  }

  if (data.depth == "" || Number(data.depth) <= 0) {
    allErrors.depth = true;
  }
}

function image(data, allErrors, light) {
  if (light.imageURL == "" && data.imageURL == "") {
    allErrors.imageURL = true;
  }
}

function isIntegratedLed(data, allErrors, integratedLed, bulbTypeState) {
  if (integratedLed == null) {
    allErrors.integratedLed = true;
  } else if (integratedLed == true) {
    kelvins();
    lumens();
    watt();
  } else {
    bulbs();
  }

  function kelvins() {
    if (
      data.kelvins == "" ||
      data.kelvins == null ||
      Number(data.kelvins) < 2700 ||
      Number(data.kelvins) > 6500 ||
      Number(data.kelvins) % 1 != 0
    ) {
      allErrors.kelvins = true;
    }
  }

  function lumens() {
    if (
      data.lumens == "" ||
      data.lumens == null ||
      Number(data.lumens) <= 0 ||
      Number(data.lumens) % 1 != 0
    ) {
      allErrors.lumens = true;
    }
  }

  function watt() {
    if (
      data.watt == "" ||
      data.watt == null ||
      Number(data.watt) <= 0 ||
      Number(data.watt) % 1 != 0
    ) {
      allErrors.watt = true;
    }
  }

  function bulbs() {
    if (
      bulbTypeState == "" ||
      bulbTypeState == null ||
      !bulbTypes.includes(bulbTypeState)
    ) {
      allErrors.bulbType = true;
    }

    if (
      data.bulbsRequired == "" ||
      data.bulbsRequired == null ||
      Number(data.bulbsRequired) <= 0 ||
      Number(data.bulbsRequired) % 1 != 0
    ) {
      allErrors.bulbsRequired = true;
    }
  }
}

function notes(data, allErrors) {
  if (!data.notes) {
    allErrors.notes = true;
  }
}
