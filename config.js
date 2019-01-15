module.exports = {
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || 'localhost',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_NAME: process.env.DB_NAME || 'okna_plus',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASS: process.env.DB_PASS || '12345',
  TABLE_PREFIX: 'okp_',
};

// При ошибке подключения к базе данных
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345'
