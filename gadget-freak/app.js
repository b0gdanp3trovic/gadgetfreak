require('dotenv').load();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let session = require('express-session');
var uglifyJs = require('uglify-js');
var fs = require('fs');

var zdruzeno = uglifyJs.minify({
  'app.js': fs.readFileSync('app_client/app.js', 'utf-8'),
  'index.controler.js': fs.readFileSync('app_client/index/index.controler.js', 'utf-8'),
  'login.controler.js': fs.readFileSync('app_client/login/login.controler.js', 'utf-8'),
  'register.controler.js': fs.readFileSync('app_client/register/register.controler.js', 'utf-8'),
  'addPost.controller.js': fs.readFileSync('app_client/add-gadget/addPost.controller.js', 'utf-8'),
  'commentModalWin.controler.js': fs.readFileSync('app_client/commentModalWin/commentModalWin.controler.js', 'utf-8'),
  'gadgetFreakData.services.js': fs.readFileSync('app_client/shared/services/gadgetFreakData.services.js', 'utf-8'),
  'commentSort.filter.js': fs.readFileSync('app_client/shared/filters/commentSort.filter.js', 'utf-8'),
  'gadgetpost.controler.js': fs.readFileSync('app_client/gadgetPost/gadgetpost.controler.js', 'utf-8'),
  'authentication.services.js': fs.readFileSync('app_client/shared/services/authentication.services.js', 'utf-8'),
  'showStars.directive.js': fs.readFileSync('app_client/shared/directive/showStars/showStars.directive.js', 'utf-8'),
  'tweet.directive.js': fs.readFileSync('app_client/shared/directive/tweet/tweet.directive.js', 'utf-8'),
  'navigation.directive.js': fs.readFileSync('app_client/shared/directive/navigation/navigation.directive.js', 'utf-8'),
  'navigation.controller.js': fs.readFileSync('app_client/shared/directive/navigation/navigation.controller.js', 'utf-8'),
  'forum.controller.js' : fs.readFileSync('app_client/forum/forum.controller.js', 'utf-8'),
  'forumData.service.js' : fs.readFileSync('app_client/skupno/storitve/forumData.service.js', 'utf-8'),
  'forumPostData.service.js' : fs.readFileSync('app_client/skupno/storitve/forumPostData.service.js', 'utf-8'),
  'forumPost.controller.js' : fs.readFileSync('app_client/forum/forumPost/forumPost.controller.js', 'utf-8'),
  'replyModal.controller.js' : fs.readFileSync('app_client/replyModal/replyModal.controller.js', 'utf-8')
});

fs.writeFile('public/angular/gadgetfreak.min.js', zdruzeno.code, function(napaka) {
  if (napaka)
    console.log(napaka);
  else
    console.log('Skripta je zgenerirana in shranjena v "gadgetfreak.min.js".');
});

var indexRouter = require('./app_server/routes/index');
var indexApi = require('./app_api/routes/index');
var usersRouter = require('./app_server/routes/users');
var passport = require('passport');

require('./app_api/models/db');
require('./app_api/configuration/passport');
var app = express();
app.use(session({ resave: true ,secret: '123456' , saveUninitialized: true}));
app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});
// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));
app.use(express.static(path.join(__dirname, 'app_client')));
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/api', indexApi);
app.use('/users', usersRouter);

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Obvladovanje napak zaradi avtentikacije
app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({
      "message": err.name + ": " + err.message
    });
  }
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
});


module.exports = app;
