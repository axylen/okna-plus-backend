const express = require('express');
const routs = express.Router();

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
