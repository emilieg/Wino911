var express= require('express');
var app = express();
var session = require('express-session');
var db = require("./models");
var ejsLayout = require("express-ejs-layouts");
var request = require('request');
var bodyParser = require('body-parser');
var flash = require('connect-flash');



app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(ejsLayout);
app.use(express.static(__dirname + '/static'));
app.use(flash());

app.use(session({
  secret: 'Super secrettttt',
  resave: false,
  saveUninitialized: true
}));



app.use(function(req,res,next){
  console.log("FIRST USER",req.session.userId);
  if(req.session.userId){
    db.user.findById(req.session.userId).then(function(user){
      req.currentUser = user;
      res.locals.currentUser = user;
      next();
    });
  } else {
    req.currentUser = false;
    res.locals.currentUser = false;
    next();
  }
})

app.get('/', function(req, res) {
  res.render('index', {alerts: req.flash()});
});

app.get('/search', function(req, res) {
  if(req.currentUser) {
    res.render('search', {
      // business: business
    });
  } else {
    req.flash('danger', ' You must be loggd in'); 
    res.redirect('/');
  }
});


app.get('/favorites',function(req,res){
  if(req.currentUser) {
  db.favorite.findAll().then(function(favorites) {
    res.render('favorites', {
      favorites: favorites
    });
  });
}
});


app.get('/about', function(req,res){
  res.render('about')
})


app.post('/favorites', function(req,res){
  console.log("userID:", req.session.userId);
  db.user.findOrCreate({where:{
    id: req.session.userId
  }}).spread(function(user, created){
    db.favorite.findOrCreate({where:{
      business: req.body.business,
      address: req.body.address
    }}).spread(function(favorite,created){
     console.log("favorite:", favorite.business);
     user.addFavorite(favorite);
    });
  });
});


app.use('/yelp', require('./controllers/yelp'));
app.use('/auth', require('./controllers/auth'));



app.listen(process.env.PORT || 3000)