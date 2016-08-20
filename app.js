var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var multer = require('multer');

var routes = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');

var app = express();
require('./configs/config/db');



app.engine('hbs', hbs({extname : 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/',partialsDir: __dirname + '/views/partials/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');



app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use(multer());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/users', users);
app.use('/admin', admin);



app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
