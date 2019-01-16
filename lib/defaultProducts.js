const window = {
  width: {
    type: 'range',
    min: 900,
    max: 1800,
    label: 'Ширина',
  },
  height: {
    type: 'range',
    min: 1100,
    max: 1600,
    label: 'Высота',
  },
  profile: {
    type: 'select',
    values: {
      exprof: {
        text: 'Exprof',
        price: 5000,
      },
      proplex: {
        text: 'Proplex',
        price: 6500,
      },
    },
  },
  window: {
    type: 'select',
    откидное: {
      text: 'Откидное',
      price: 1100,
    },
    поворотное: {
      text: 'Поворотное',
      price: 1500,
    },
    поворотноОткидное: {
      text: 'Поворотно-откидное',
      price: 2700,
    },
  },
  furniture: {
    type: 'select',
    values: {
      axor: {
        text: 'Axor',
        price: 1000,
      },
      maco: {
        text: 'Maco',
        price: 1500,
      },
    },
  },
};

module.exports = {
  window,
};
