console.clear();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const api = require('./api');
const config = require('./config');

app.use(express.static('public'));
app.use(express.static('client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', api);

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

app.listen(config.PORT, function(err) {
  console.log('Сервер запущен.');
  console.log(`Перейти: http://localhost:${config.PORT}`);
});
