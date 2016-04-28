var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

router.post('/signup', function(req, res) {
  db.user.findOrCreate({
    where: {email: req.body.email
    },
    defaults: {
      name: req.body.name, 
      password: req.body.password}
  }).spread(function(user, created) {
    res.redirect('/');
  }).catch(function(err){
    res.send(err);
    console.log(err);
});
});


router.get('/login', function(req, res) {
  res.render('auth/login');
});

router.post('/login', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  console.log("email", email);


  db.user.authenticate(email, password, function(err, user) {
    if(err) {
      res.send(err);
    } else if (user){
      console.log(req.session);
      req.session.userId = user.id;

      res.redirect('/search');
    } else {
      res.send('user and/or password invalid');
    }
  });
});

router.get('/logout', function(req,res){
  req.session.userId = false;
  res.redirect('/');
});










module.exports = router;