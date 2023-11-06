var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var moviesRouter = require('./routes/movies');

var app = express();

app.use(cors({              // front 서버인 127.0.0.1:8080 의 요청을 허용하도록 cors 사용
  origin: 'http://localhost:8080',  // index.js 페이지에서 header에다가 credential allow 이런거 보내줄 필요 없다.. 
  credentials:true,
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());

console.log('여기 실행중... __dirname :  ', __dirname)

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// history위까지는 vue.js의 router 영향을 안받는듯...
const history = require('connect-history-api-fallback');

app.use('/api/movies', moviesRouter);
app.use('/users', usersRouter);

// app.use(history()); 
// vue router 기능을 위해 추가.. 음 조사해보니 router기능을 위한게아니고..
// 잘못된 경로들이 들어오면 모두 dist 폴더로 보내준다?고한다. 

app.use('/', indexRouter);
// 여기서 / 로 무조건 해야되는 이유는, idnex.html이 css, js를 /static/css/app.js/ 이런식으로 참조하기때문. 
// 이거 중요하다. static 경로를 / 로 일반적으로 한다고 한다. --> chatgpt 참고. 









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
