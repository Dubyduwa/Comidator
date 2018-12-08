module.exports = function(app, passport) {
  const express = require('express');
  const controller = require('../controllers/controllers');

 app.get('/', function(req, res){
  res.render('index.ejs');
 });

 app.get('/login', function(req, res){
  res.render('login.ejs', {message:req.flash('loginMessage')});
 });

 app.get('/mysearch', function(req, res){
    var mytext = req.query.mytext;
    console.log(mytext);
    req.getConnection((err, conn) => {
      console.log(err);
      conn.query('SELECT * FROM appcomidasdb.Oferta WHERE titulo LIKE ' + '"%' + mytext + '%"' + ' OR descripcion LIKE ' + '"%' + mytext + '%"', (err, rows) => {
        console.log(err);
        console.log(rows);
        res.render('searchoffer', {
          user: req.user,
          data: rows,
          text: mytext
        });
      });
    });
});

 app.get('/inicio', controller.inicio);
 app.get('/addoffer', controller.addoffer);
 app.post('/addoffer', controller.addofferi);
 app.get('/deleteoffer/:id', controller.deleteoffer);
 app.get('/deleteuser/:id', controller.deleteuser);
 app.get('/killuser/:id', controller.killuser);
 app.get('/updateoffer/:id', controller.updateoffer);
 app.post('/updateoffer/:id', controller.updateofferi);
 app.get('/updateuser/:id', controller.updateuser);
 app.post('/updateuser/:id', controller.updateuseri);
 app.get('/viewoffer/:id', controller.viewoffer);
 app.get('/viewuser/:id', controller.viewuser);

 app.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
 }),
  function(req, res){
   if(req.body.remember){
    req.session.cookie.maxAge = 1000 * 60 * 3;
   }else{
    req.session.cookie.expires = false;
   }
   res.redirect('/');
  });

 app.get('/signup', function(req, res){
  res.render('signup.ejs', {message: req.flash('signupMessage')});
 });

 app.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signup',
  failureFlash: true
 }));

 app.get('/profile', isLoggedIn, function(req, res){
   req.getConnection((err, conn) => {
     conn.query('SELECT * FROM Oferta', (err, rows) => {
       if (err){
         console.log(err);
       }
       console.log(req.user);
       console.log(rows);
       res.render('profile.ejs', {
         user: req.user,
         data: rows
       });
     });
   });
 });

 app.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
 })
};

function isLoggedIn(req, res, next){
 if(req.isAuthenticated())
  return next();

 res.redirect('/');
}
