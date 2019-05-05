console.clear();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const api = require('./api');
const compression = require('compression');
const config = require('./config');

let oneWeek = 7 * 24 * 60 * 60 * 1000;
app.use(compression());
app.use('/', express.static(__dirname + '/public/', { maxAge: oneWeek }));
app.use('/', express.static(__dirname + '/client/', { maxAge: oneWeek }));
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
