var express = require('express');
var session = require('express-session');
var myConnection = require('express-myconnection');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mysql = require('mysql');
var app = express();
var port = process.env.PORT || 3000;

var passport = require('passport');
var flash = require('connect-flash');

require('./controllers/passport')(passport);//rutas para autenticación
require('./controllers/controllers');//rutas

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
 extended: true
}));
app.use(myConnection(mysql, {
  host: 'localhost',
  user: 'admin',
  password: 'admin1234',
  port: 3306,
  database: 'appcomidasdb'
}, 'single'));
app.use(express.urlencoded({extended: false}));

app.set('views', './src/views');;
app.set('view engine', 'ejs');

app.use(session({
 secret: 'justasecret',
 resave:true,
 saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./routes/routes.js')(app, passport);

app.listen(port);
console.log("Port: " + port);
