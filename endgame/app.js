var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


//sessions setup
app.use(session({
  resave: false, //this basically takes the load off the server a little bit by not frequently saving the data that has not changed... it should be saved only if it has been changed
  saveUninitialized: false, //this also keeps the server light... it does this by not saving the current session to the server until and unless there is any change in the current session
  secret: "hehehehehehehe"
})); //this code will help us create sessions

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//Clearing the cache memory before each request
app.use((req,res,next)=>{
  res.setHeader('Cache-Control','no-cache,no-store,must-revalidate');
  res.setHeader('Pragma','no-cache');
  res.setHeader('Expires','0');
  next();
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
