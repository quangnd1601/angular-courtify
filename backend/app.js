var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); //cài đặt 
var dotenv = require("dotenv");
dotenv.config();

var indexRouter = require('./routes/index');
var userRouter = require('./routes/userRoutes');
var sportCenterRouter = require('./routes/sportCenterRoutes');
var courtRouter = require('./routes/courtRoutes');
var timeSlotRouter = require('./routes/timeSlotRoutes');
var bookingRouter = require('./routes/bookingRoutes');
var serviceRouter = require('./routes/serviceRoutes');
var voucherRouter = require('./routes/voucherRoutes');
var reviewRouter = require('./routes/reviewRoutes');
var paymentRouter = require('./routes/paymentRoutes');
var membershipRouter = require('./routes/membershipRoutes');
var sportRouter = require('./routes/sportRoutes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Cho phép Frontend gọi API
app.use(cors());

app.use('/', indexRouter);
app.use('/api/users', userRouter);
app.use('/api/sport-centers', sportCenterRouter);
app.use('/api/courts', courtRouter);
app.use('/api/timeslots', timeSlotRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/services', serviceRouter);
app.use('/api/vouchers', voucherRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/payments', paymentRouter);
app.use('/api/memberships', membershipRouter);
app.use('/api/sports', sportRouter);

// 1. Kết nối Database
const connectDB = require('./config/db');
connectDB();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
