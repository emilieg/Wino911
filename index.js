var express= require('express');
var app = express();
var ejsLayout = require("express-ejs-layouts");
var request = require('request');
var bodyParser = require('body-parser');
var session = require('express-session');
var db = require("./models");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(ejsLayout);
app.use('/auth', require('./controllers/auth'));

app.use(session({
  secret: 'Super secrettttt',
  resave: false,
  saveUninitialized: true
}));


db.user.create({ name: 'TestName', email: 'test@email.com', password: 'testpassword' }).then(function(data) {
  // you can now access the newly created task via the variable data
});




app.get('/', function(req, res) {
//   // you can now access the newly created task via the variable data
console.log("working");
res.render('auth/signup');

});



app.listen(3000);