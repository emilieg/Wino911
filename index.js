var express= require('express');
var app = express();
var session = require('express-session');
var db = require("./models");
var ejsLayout = require("express-ejs-layouts");
var request = require('request');
var bodyParser = require('body-parser');




app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(ejsLayout);

app.use(session({
  secret: 'Super secrettttt',
  resave: false,
  saveUninitialized: true
}));

app.use('/auth', require('./controllers/auth'));



app.get('/', function(req, res) {
  console.log(req.session);
//   // you can now access the newly created task via the variable data

res.render('index');

});





app.listen(3000);