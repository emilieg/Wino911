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
  console.log('ll' + ll);
yelp.search({ term: 'wine', ll: ll, sort: 1 })
.then(function (data) {

  var returnData = {
    'business_name': data.businesses[0].name,
    'coordinate': data.businesses[0].location.coordinate,
    'address': data.businesses[0].location.address[0],
    'distance': data.businesses[0].distance
  }

  console.log(returnData);
  res.send(returnData);

})
.catch(function (err) {
  console.error(err);
});
}) 








module.exports = router;