const { mergeObjects } = require('./functions');

const window = {
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
  glass: {
    type: 'select',
    label: 'Стеклопакет',
    values: {
      4: { text: '4 – одно стекло' },
      24: { text: '24 – два стекла (однокамерный)' },
      32: { text: '32 – три стекла (двухкамерный)' },
      40: { text: '40 – три стекла (двухкамерный)' },
    },
  },
  fittings: {
    type: 'select',
    label: 'Фурнитура',
    values: {
      axor: { text: 'Axor' },
      maco: { text: 'Maco' },
    },
  },
  window: {
    type: 'select-window',
    label: 'Окно',
    count: 1,
    values: {
      blank: { text: 'Глухое' },
      tilt: { text: 'Откидное' },
      turn: { text: 'Поворотное' },
      tiltAndTurn: { text: 'Поворотно-откидное' },
    },
    mosquitoNet: { text: 'Москитная сетка', price: 500 },
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
  glass: {
    values: {
      24: { price: 1000 },
      32: { price: 1500 },
      40: { price: 1800 },
    },
  },
  fittings: {
    values: {
      axor: { price: 1000 },
      maco: { price: 1500 },
    },
  },
  window: {
    values: {
      tilt: { price: 1100 },
      turn: { price: 1500 },
      tiltAndTurn: { price: 2700 },
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
  glass: {
    values: {
      24: { price: 1100 },
      32: { price: 1600 },
      40: { price: 1900 },
    },
  },
  fittings: {
    values: {
      axor: { price: 1400 },
      maco: { price: 1900 },
    },
  },
  window: {
    count: 2,
    values: {
      tilt: { price: 1500 },
      turn: { price: 1900 },
      tiltAndTurn: { price: 3100 },
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
  glass: {
    values: {
      24: { price: 1200 },
      32: { price: 1700 },
      40: { price: 2000 },
    },
  },
  fittings: {
    values: {
      axor: { price: 1700 },
      maco: { price: 2200 },
    },
  },
  window: {
    count: 3,
    values: {
      tilt: { price: 1800 },
      turn: { price: 2200 },
      tiltAndTurn: { price: 3400 },
    },
  },
});

const door = {
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
  glass: {
    type: 'select',
    label: 'Стеклопакет',
    values: {
      4: { text: '4 – одно стекло' },
      24: { text: '24 – два стекла (однокамерный)' },
      32: { text: '32 – три стекла (двухкамерный)' },
      40: { text: '40 – три стекла (двухкамерный)' },
    },
  },
  fittings: {
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
  glass: {
    values: {
      24: { price: 1000 },
      32: { price: 1500 },
      40: { price: 1800 },
    },
  },
  fittings: {
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
