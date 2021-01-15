/* 'XMLHttpRequest is not defined' workaround */
global.XMLHttpRequest = require("xhr2");

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

/* View routes */
const indexRouter = require('./routes/indexView');
const wordbaseRouter = require('./routes/wordbaseView');

/* Controller routes */
const accountRouter = require('./routes/account');
const wordRouter = require('./routes/word');
const learningRouter = require('./routes/learningView');
const translateRouter = require('./routes/googleTranslate');
const firebaseStorageRouter = require('./routes/firebaseStorage');

/* API routes */
const wordAPI = require('./api/wordAPI');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/account', accountRouter);
app.use('/word', wordRouter);
app.use('/learning', learningRouter);
app.use('/wordbase', wordbaseRouter);
app.use('/translate', translateRouter);
app.use('/upload', firebaseStorageRouter);
app.use('/api/word/', wordAPI);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res/*, next*/) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
