module.exports = {
  /* НАСТРОЙКИ СЕРВЕРА */
  PORT: process.env.PORT || 8080,
  HOST: process.env.HOST || '127.0.0.1',

  /* НАСТРОКИ БАЗЫ ДАННЫХ */
  DB_HOST: process.env.DB_HOST || '127.0.0.1',
  DB_NAME: process.env.DB_NAME || 'okna_plus', // Название базы данных
  DB_USER: process.env.DB_USER || 'root', // Пользователь базы данных
  DB_PASS: process.env.DB_PASS || '12345', // Пароль пользователя базы данных
  DB_PORT: process.env.DB_PORT || '3306', // Порт СУБД MySQL
  TABLE_PREFIX: 'okp_',

  /* НАСТРОКИ ПРИЛОЖЕНИЯ */
  DEFAULT_PASSWORD: process.env.DEFAULT_PASSWORD || '12345', // Пароль для входа в панель администратора
  SECRET_KEY: process.env.SECRET_KEY || 'okp_secret-key',
  RECREATE_DB: true, // Пересоздавать базу данных при перезапуске сервера true-да false-нет
  FAKE_ORDERS_NUM: 1000, // Количество сгенерированных заказов при создании базы данных
  FAKE_ORDERS_SEED: 5,

  /* ДОПОЛНИТЕЛЬНЫЕ НАСТРОЙКИ */
  INSERT_MAX_CHUNK_SIZE: 500,
};

// При ошибке подключения к базе данных
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345'
