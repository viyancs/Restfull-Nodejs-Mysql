var express = require('express');
var http = require('http');
var debug = require('debug')('app4');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');

// use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes/index');
app.use('/', routes);

var port = process.env.PORT || 8080;
var env = process.env.NODE_ENV || 'development';

var server = http.createServer(app);
server.listen(port, function () {
  console.log('RESTFull API Server Start On Port ' + server.address().port)
})
