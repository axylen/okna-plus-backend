const { mergeObjects } = require('./functions');

const window = {
  type: 'window',
  width: {
    type: 'range',
    label: 'Ширина',
  },
  height: {
    type: 'range',
    label: 'Высота',
  },
  profile: {
    type: 'select',
    label: 'Профиль',
    values: {
      exprof: { text: 'Exprof' },
      proplex: { text: 'Proplex' },
    },
  },
  window: {
    type: 'select',
    label: 'Окно',
    count: 1,
    откидное: { text: 'Откидное' },
    поворотное: { text: 'Поворотное' },
    поворотноОткидное: { text: 'Поворотно-откидное' },
  },
  furniture: {
    type: 'select',
    label: 'Фурнитура',
    values: {
      axor: { text: 'Axor' },
      maco: { text: 'Maco' },
    },
  },
};

const window1 = mergeObjects(window, {
  width: {
    min: 900,
    max: 1800,
  },
  height: {
    min: 1100,
    max: 1600,
  },
  profile: {
    values: {
      exprof: { price: 5000 },
      proplex: { price: 6500 },
    },
  },
  window: {
    откидное: { price: 1100 },
    поворотное: { price: 1500 },
    поворотноОткидное: { price: 2700 },
  },
  furniture: {
    values: {
      axor: { price: 1000 },
      maco: { price: 1500 },
    },
  },
});

const window2 = mergeObjects(window, {
  width: {
    min: 1200,
    max: 2400,
  },
  height: {
    min: 1100,
    max: 1600,
  },
  profile: {
    values: {
      exprof: { price: 5500 },
      proplex: { price: 7000 },
    },
  },
  window: {
    count: 2,
    откидное: { price: 1500 },
    поворотное: { price: 1900 },
    поворотноОткидное: { price: 3100 },
  },
  furniture: {
    values: {
      axor: { price: 1400 },
      maco: { price: 1900 },
    },
  },
});

const window3 = mergeObjects(window, {
  width: {
    min: 1800,
    max: 2800,
  },
  height: {
    min: 1100,
    max: 1600,
  },
  profile: {
    values: {
      exprof: { price: 6000 },
      proplex: { price: 7500 },
    },
  },
  window: {
    count: 3,
    откидное: { price: 1800 },
    поворотное: { price: 2200 },
    поворотноОткидное: { price: 3400 },
  },
  furniture: {
    values: {
      axor: { price: 1700 },
      maco: { price: 2200 },
    },
  },
});

const door = {
  type: 'door',
  width: {
    type: 'range',
    label: 'Ширина',
  },
  height: {
    type: 'range',
    label: 'Высота',
  },
  profile: {
    type: 'select',
    label: 'Профиль',
    values: {
      exprof: { text: 'Exprof' },
      proplex: { text: 'Proplex' },
    },
  },
  furniture: {
    type: 'select',
    label: 'Фурнитура',
    values: {
      axor: { text: 'Axor' },
      maco: { text: 'Maco' },
    },
  },
};

const door1 = mergeObjects(door, {
  width: {
    min: 700,
    max: 1200,
  },
  height: {
    min: 1800,
    max: 2250,
  },
  profile: {
    values: {
      exprof: { price: 3000 },
      proplex: { price: 3500 },
    },
  },
  furniture: {
    values: {
      axor: { price: 500 },
      maco: { price: 1000 },
    },
  },
});

module.exports = {
  window,
  window1,
  window2,
  window3,
  door,
  door1,
};
