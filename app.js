var express = require('express');
var http = require('http');
var debug = require('debug')('app4');
var bodyParser = require('body-parser');
var app = express();
var routes = require('./routes/index');

// use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);

var port = process.env.PORT || 8080;
var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
    app.use(function(err, req, res, next) {
          res.status(err.status || 500);
          res.render('error', {
              message: err.message,
              error: err
          });
    });
}


var server = http.createServer(app);
server.listen(port, function () {
  debug('RESTFull API Server Start On Port ' + server.address().port)
})
