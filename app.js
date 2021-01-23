/* 'XMLHttpRequest is not defined' workaround */
global.XMLHttpRequest = require("xhr2");

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');

/* View routes */
const indexRouter = require('./routes/indexView');
const wordbaseRouter = require('./routes/wordbaseView');

/* Controller routes */
const accountRouter = require('./routes/account');
const wordRouter = require('./routes/word');
const learningRouter = require('./routes/learningView');
const firebaseStorageRouter = require('./routes/fileToWords');

/* API routes */
const wordAPI = require('./api/wordAPI');
const ocrAPI = require('./api/ocrAPI');
const repeatingWordsAPI = require('./api/repeatingWordsAPI');

const app = express();
app.use(cors());

/* Setup view engine */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/* Set Express settings */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Setup session */
app.use(session({
  secret: 'supersecretpassword',
  resave: false,
  saveUninitialized: true
}));

/* Set routes to urls */
app.use('/', indexRouter);
app.use('/account', accountRouter);
app.use('/word', wordRouter);
app.use('/learning', learningRouter);
app.use('/wordbase', wordbaseRouter);
app.use('/upload', firebaseStorageRouter);
app.use('/api/word/', wordAPI);
app.use('/api/ocr/', ocrAPI);
app.use('/api/repeatingwords', repeatingWordsAPI);


/* Catch 404 and forward to error handler */
app.use(function(req, res, next) {
  next(createError(404));
});

/* Error handler */
app.use(function(err, req, res/*, next*/) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
