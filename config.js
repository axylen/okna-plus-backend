module.exports = {
  PORT: process.env.PORT || 8080,
  HOST: process.env.HOST || 'localhost',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_NAME: process.env.DB_NAME || 'okna_plus',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASS: process.env.DB_PASS || '12345',
  DB_PORT: process.env.DB_PORT || '3306',
  TABLE_PREFIX: 'okp_',
};

// При ошибке подключения к базе данных
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345'
