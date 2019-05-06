const { mysql } = require('../mysql');
const tables = require('../tables');

async function ordersAndIncomeAtMonth(atMonth = new Date()) {
  const res = await mysql.query(
    `SELECT COUNT(*) as count, SUM(price) as income
    FROM ${tables.name.orders}
    WHERE MONTH(date) = MONTH(?) AND YEAR(date) = YEAR(?)`,
    [atMonth, atMonth],
  );
  return res[0];
}

async function ordersAtDayOfTheWeek() {
  const res = await mysql.query(
    `SELECT WEEKDAY(date) as weekday, COUNT(*) as count
      FROM ${tables.name.orders}
      GROUP BY WEEKDAY(date)
      ORDER BY weekday`,
  );

  return res.map(row => ({
    weekday: row.weekday,
    count: row.count,
  }));
}

async function productsByPopularity() {
  const res = await mysql.query(`
  SELECT name, SUM(count) as num
  FROM ${tables.name.order_products}
  GROUP BY name
  ORDER BY num DESC`);

  return res;
}

async function ordersAndIncomeMonthly() {
  const res = await mysql.query(`
  SELECT YEAR(date) as year, MONTH(date) as month, COUNT(*) as count, SUM(price) as sum
  FROM ${tables.name.orders}
  GROUP BY YEAR(date), MONTH(date)`);

  const resObj = {};

  res.forEach(el => {
    if (!resObj[el.year]) resObj[el.year] = {};

    resObj[el.year][el.month] = {
      count: el.count,
      sum: el.sum,
    };
  });

  for (let i = 1; i < 13; i++) {
    for (let key in resObj) {
      resObj[key][i] = resObj[key][i] || { count: 0, sum: 0 };
    }
  }

  return resObj;
}

async function getStats(atMonth = new Date()) {
  const prevMonth = new Date(atMonth);
  prevMonth.setMonth(prevMonth.getMonth() - 1);

  const res = await Promise.all([
    ordersAndIncomeAtMonth(atMonth),
    ordersAtDayOfTheWeek(),
    productsByPopularity(),
    ordersAndIncomeMonthly(),
    ordersAndIncomeAtMonth(prevMonth),
  ]);

  return {
    ordersAndIncomeAtMonth: res[0],
    ordersAtDayOfTheWeek: res[1],
    productsByPopularity: res[2],
    ordersAndIncomeMonthly: res[3],
    ordersAndIncomeAtPrevMonth: res[4],
  };
}

module.exports = {
  ordersAndIncomeAtMonth,
  ordersAtDayOfTheWeek,
  productsByPopularity,
  ordersAndIncomeMonthly,
  getStats,
};
