const express = require('express');
const routs = express.Router();

const mysql = require('../lib/mysqlFunctions');

mysql.initialSetup({ recreate: true });

routs.get('/', async function(req, res) {
  const responce = {
    text: 'working',
    test: [
      {
        text: '1',
        num: 1,
      },
      {
        text: '2',
        num: 2,
      },
    ],
  };

  res.json(responce);
});

module.exports = routs;

/*
  API

  /api/price/:item
    get	    получить информацию о цене
    put	    обновить информацию о цене
    post	  создать информацию о цене
    delete	удалить информацию о цене

    В бд:
      name	- название предмета (передаётся в item)
      date	- дата изменения цены
      price - объект с параметрами
    
    ответ:
    {
      name: name,
      price: {
        a: 1000,
        b: 330,
        ...
      }
    }
    возвращает цену с датой, ближайшей к текущей
  


  /api/price
    get	    рассчитывает и возвращает цену. Принимает параметры предмета
    

  /api/order
    get	    получить список заказов
    post	  добавить заказ. Возвращает номер нового заказа и объект с предметами заказа
    
    в бд:
      id      номер заказа
      cost    стоимость заказа
      date	  дата заказа
      cart	  предметы в заказе в виде объекта. Имя и параметры

    
  /api/order/:id
    get	    получает информацию о заказе
    put	    обновляет информацию о заказе
    delete	удаляет заказ

*/

const w3 = {
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
        name: 'Exprof',
        price: 5000,
        window: {
          откидное: {
            name: 'Откидное',
            price: 1000,
          },
          поворотноОткидное: {
            name: 'Поворотно-откидное',
            price: 2500,
          },
        },
      },
      proplex: {
        name: 'Proplex',
        price: 6500,
      },
    },
  },
  window: {
    откидное: {
      name: 'Откидное',
      price: 1100,
    },
    поворотное: {
      name: 'Поворотное',
      price: 1500,
    },
    поворотноОткидное: {
      name: 'Поворотно-откидное',
      price: 2700,
    },
  },
  furniture: {
    type: 'select',
    values: {
      axor: {
        name: 'Axor',
        price: 1000,
      },
      maco: {
        name: 'Maco',
        price: 1500,
      },
    },
  },
};
