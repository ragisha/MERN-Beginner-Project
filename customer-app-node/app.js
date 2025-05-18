var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index'); //pages
var secureIndex = require('./routes/secureIndex'); 
var usersRouter = require('./routes/users'); //api
var apiCustomerRouter = require('./routes/apiCustomer'); //api
var apiProductRouter = require('./routes/apiProduct');
var apiPerson = require('./routes/apiPerson');

var express = require('express')
var cors = require('cors')
var app = express()
var session = require('express-session')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var sess = {
  secret: 'keyboardABC',
  cookie: {},
  proxy: true,
  resave: true,
  saveUninitialized: true
}
app.use(session(sess));
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter); ///
app.use('/users', usersRouter);

/*
app.use(function(req, res, next) {
  console.log("This is my check point for user / autorization");
  if(typeof(req.session.user) == 'string'){
    next(); 
  }else{
    res.send({result:"fail", msg:"you are not authorized for this request."})
  }
});*/

app.use('/', secureIndex);
app.use('/api/customer', apiCustomerRouter);
app.use('/api/product', apiProductRouter);
app.use('/api/person', apiPerson);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
