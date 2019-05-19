module.exports = {
  // Настроки сервера
  PORT: process.env.PORT || 8080,
  HOST: process.env.HOST || 'localhost',
  // Настроки базы данных
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_NAME: process.env.DB_NAME || 'okna_plus',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASS: process.env.DB_PASS || '12345',
  DB_PORT: process.env.DB_PORT || '3306',
  TABLE_PREFIX: 'okp_',
  // Настроки приложения
  DEFAULT_PASSWORD: process.env.DEFAULT_PASSWORD || '12345',
  SECRET_KEY: process.env.SECRET_KEY || 'okp_secret-key',
  RECREATE_DB: true,
  FAKE_ORDERS_NUM: 1000,
  FAKE_ORDERS_SEED: 5,
  // Дополнительные настройки
  INSERT_MAX_CHUNK_SIZE: 500,
};

// При ошибке подключения к базе данных
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345'
