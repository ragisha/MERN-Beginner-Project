var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var secureIndexRouter = require('./routes/secureIndex'); 
var usersRouter = require('./routes/users');
var apiStudentRouter = require('./routes/apiStudent');
var apiTeacherRouter=require('./routes/apiTeacher');
var apiSubjectRouter=require('./routes/apiSubject');

var app = express();
var session = require('express-session');

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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function(req, res, next) {
  console.log("This is my check point for user / autorization");
  if(typeof(req.session.user) == 'string'){
    next(); 
  }else{
    res.send({result:"fail", msg:"you are not authorized for this request."})
  }
});

app.use('/', secureIndexRouter);
app.use('/api/teacher', apiTeacherRouter);
app.use('/api/student', apiStudentRouter);
app.use('/api/subject', apiSubjectRouter);

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
