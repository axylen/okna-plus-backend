module.exports = {
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || 'localhost',
  DB_HOST: 'localhost',
  DB_NAME: 'okna_plus',
  DB_USER: 'root',
  DB_PASS: '12345',
};

// При ошибке подключения к базе данных
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345'
