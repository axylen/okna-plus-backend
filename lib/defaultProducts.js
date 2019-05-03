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
    min: 600,
    max: 1800,
  },
  height: {
    min: 600,
    max: 1800,
  },
  profile: {
    values: {
      exprof: { price: 2000 },
      proplex: { price: 2250 },
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
      tiltAndTurn: { price: 2000 },
    },
  },
});

const window2 = mergeObjects(window, {
  width: {
    min: 1000,
    max: 2400,
  },
  height: {
    min: 800,
    max: 1600,
  },
  profile: {
    values: {
      exprof: { price: 1900 },
      proplex: { price: 2100 },
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
      axor: { price: 1400 },
      maco: { price: 1900 },
    },
  },
  window: {
    count: 2,
    values: {
      tilt: { price: 1100 },
      turn: { price: 1500 },
      tiltAndTurn: { price: 2000 },
    },
  },
});

const window3 = mergeObjects(window, {
  width: {
    min: 1500,
    max: 2800,
  },
  height: {
    min: 900,
    max: 1600,
  },
  profile: {
    values: {
      exprof: { price: 1800 },
      proplex: { price: 2000 },
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
      axor: { price: 1300 },
      maco: { price: 1800 },
    },
  },
  window: {
    count: 3,
    values: {
      tilt: { price: 1100 },
      turn: { price: 1500 },
      tiltAndTurn: { price: 2000 },
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
    min: 800,
    max: 1200,
  },
  height: {
    min: 2000,
    max: 2350,
  },
  profile: {
    values: {
      exprof: { price: 2550 },
      proplex: { price: 2800 },
    },
  },
  glass: {
    values: {
      24: { price: 800 },
      32: { price: 1100 },
      40: { price: 1300 },
    },
  },
  fittings: {
    values: {
      axor: { price: 750 },
      maco: { price: 1200 },
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
