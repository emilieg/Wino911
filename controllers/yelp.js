var express = require('express');
var db = require("../models");
var ejsLayout = require("express-ejs-layouts");
var request = require('request');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var router = express.Router();
var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  token: process.env.TOKEN,
  token_secret: process.env.TOKEN_SECRET,
});

router.get('/search', function (req,res) {
  var latitude = req.query.latitude;
  var longitude = req.query.longitude;
  var ll= latitude + ',' + longitude;
  console.log(ll);
yelp.search({ term: 'wine', ll: ll })
.then(function (data) {

  var returnData = {
    'business_name': data.businesses[0].name,
    'address': data.businesses[0].location.coordinate
  }

  console.log(returnData);
  res.send(returnData);

})
.catch(function (err) {
  console.error(err);
});
}) 


//https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAMZl2e4nsvl_7SniQQlGa5_F74LW2hcWQ






module.exports = router;