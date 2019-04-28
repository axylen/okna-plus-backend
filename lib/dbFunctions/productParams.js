const { deepCopy } = require('../functions');

function calcArea(params) {
  return (params.width * params.height) / 1000000;
}

function getPriceList(fields) {
  const prices = {};

  for (let key in fields) {
    const field = fields[key];
    if (field.type === 'range') continue;

    const values = {};
    prices[key] = values;

    for (let key in field.values) {
      values[key] = field.values[key].price || 0;
    }
  }

  return prices;
}

function getCurrentPrices(fields, params) {
  const prices = getPriceList(fields);
  const cPrices = {};

  for (let key in params) {
    let price = prices[key];
    if (!price) continue;

    if (!Array.isArray(params[key])) {
      cPrices[key] = price[params[key]];
      continue;
    }

    cPrices[key] = params[key].reduce((acc, window) => {
      let val = price[window.openTo];

      if (window.mosquitoNet) {
        val += fields.window.mosquitoNet.price;
      }

      return acc + val;
    }, 0);
  }

  return cPrices;
}

function getPrice(fields, params) {
  const prices = getCurrentPrices(fields, params);

  const area = calcArea(params);
  const costPerSqrM = prices.profile + prices.glass;
  delete prices.profile;
  delete prices.glass;

  let price = costPerSqrM * area;

  for (let key in prices) {
    price += prices[key];
  }

  return price;
}

function calcPrice(fields) {
  return params => getPrice(fields, params);
}

function getOpenToText(openTo) {
  switch (openTo) {
    case 'no':
      return 'Глухое';
    case 'tilt':
      return 'Откидное';
    case 'toLeft':
      return 'Поворотное влево';
    case 'toRight':
      return 'Поворотное вправо';
    case 'tilt_toLeft':
      return 'Поворотно-откидное влево';
    case 'tilt_toRight':
      return 'Поворотно-откидное вправо';
    default:
      return undefined;
  }
}

function getOpenToValues(values) {
  const newVal = {};

  newVal['no'] = { ...values.blank, text: getOpenToText('no') };
  newVal['tilt'] = { ...values.tilt, text: getOpenToText('tilt') };

  newVal['toLeft'] = { ...values.turn, text: getOpenToText('toLeft') };
  newVal['toRight'] = { ...values.turn, text: getOpenToText('toRight') };

  newVal['tilt_toLeft'] = { ...values.tiltAndTurn, text: getOpenToText('tilt_toLeft') };
  newVal['tilt_toRight'] = { ...values.tiltAndTurn, text: getOpenToText('tilt_toRight') };

  return newVal;
}

function formatParam(value, field) {
  const newParam = { name: field.label };

  if (field.type === 'range') {
    newParam.value = { text: value, value };
  } else if (field.type === 'select') {
    newParam.value = { text: field.values[value].text, value };
  } else if (field.type === 'select-window') {
    newParam.value = {
      text: value.map(({ openTo, mosquitoNet }) => {
        let text = getOpenToText(openTo);
        if (mosquitoNet) text += ', москитная сетка';

        return text;
      }),
      value: deepCopy(value),
    };
  }

  return newParam;
}

module.exports = {
  calcPrice,
  getOpenToValues,
  formatParam,
  calcArea,
};
