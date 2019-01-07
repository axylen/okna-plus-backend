const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const os = require('os');
const api = require('./api');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', api);

app.get('*', function(req, res) {
  res.send('Здесь должна рендериться страница сайта react');
});

const PORT = 8081;
app.listen(PORT, function(err) {
  console.log('Сервер запущен.');
  console.log(`Перейти: http://localhost:${PORT}`);
  console.log(`ip: ${os.networkInterfaces().Ethernet[1].address}:${PORT}`);
});
