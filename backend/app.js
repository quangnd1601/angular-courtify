var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); //cài đặt 
var dotenv = require("dotenv");
dotenv.config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

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

// 1. khai báo thư viện
var mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Kết nối thành công, đang chạy trên port: " + process.env.PORT);
  })
  .catch((error) => {
    console.log("Kết nối thất bại!", error);
  });
  
// 2. tạo biến cho phép truy cập CORS
var corsOptionsDelegate = function (req, callback) {
 var corsOptions= { origin: true };
 callback(null, corsOptions);
}

//chạy hàm cho phép truy cập 
app.use(cors(corsOptionsDelegate));

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
