var LocalStrategy = require("passport-local").Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

const controller ={};

connection.query('USE ' + dbconfig.database);

module.exports = function(passport) {
 passport.serializeUser(function(user, done){
  done(null, user.id);
 });

 passport.deserializeUser(function(id, done){
  connection.query("SELECT * FROM Usuario WHERE id = ? ", [id],
   function(err, rows){
    done(err, rows[0]);
   });
 });

 passport.use(
  'local-signup',
  new LocalStrategy({
   usernameField : 'username',
   passwordField: 'password',
   passReqToCallback: true
  },
  function(req, username, password, done){
   connection.query("SELECT * FROM Usuario WHERE username = ? ",
   [username], function(err, rows){
    if(err)
     return done(err);
    if(rows.length){
     return done(null, false, req.flash('signupMessage', '¡Ya existe ese nombre de usuario'));
    }else{
     var newUserMysql = {
      username: username,
      password: password
     };
     var email = req.body.email;
     var alergenos = req.body.alergenos;
     var preferencias = req.body.preferencias;
     var ciudad = req.body.ciudad;

     var insertQuery = "INSERT INTO Usuario (username, password, email, alergenos, preferencias, ciudad) values (?, ?, ?, ?, ?, ?)";

     connection.query(insertQuery, [newUserMysql.username, newUserMysql.password, email, alergenos, preferencias, ciudad],
      function(err, rows){
       console.log(err);
       console.log(rows);
       newUserMysql.id = rows.insertId;

       return done(null, newUserMysql);
      });
    }
   });
  })
 );

 passport.use(
  'local-login',
  new LocalStrategy({
   usernameField : 'username',
   passwordField: 'password',
   passReqToCallback: true
  },
  function(req, username, password, done){
   connection.query("SELECT * FROM Usuario WHERE username = ? ", [username],
   function(err, rows){
    if(err)
     return done(err);
    if(!rows.length){
     return done(null, false, req.flash('loginMessage', 'No se encuentra el usuario'));
    }
    if(password != rows[0].password)
     return done(null, false, req.flash('loginMessage', 'Contraseña incorrecta'));

    return done(null, rows[0]);
   });
  })
 );
};
