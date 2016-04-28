var express = require('express');
var db = require("../models");
var ejsLayout = require("express-ejs-layouts");
var request = require('request');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var router = express.Router();


// router.get('/search', function (req,res) {
//   var latitude = req.query.latitude;
//   var longitude = req.query.longitude;
//   var ll= latitude + ',' + longitude;
//   console.log('ll' + ll);
// yelp.search({ term: 'wine', ll: ll, sort: 1 })
// .then(function (data) {

//   var returnData = {
//     'business_name': data.businesses[0].name,
//     'latitude': data.businesses[0].location.coordinate.latitude,
//     'longitude': data.businesses[0].location.coordinate.longitude,
//     'address': data.businesses[0].location.address[0],
//     'distance': data.businesses[0].distance
//   }

//   console.log('returnData:' +returnData);
//   res.send(returnData);

// })
// .catch(function (err) {
//   console.error(err);
// });
// }) 

router.get('/search', function(req,res){
  var latitude = req.query.latitude;
  var longitude = req.query.longitude;
  var api_call = 'https://maps.googleapis.com/maps/api/place/textsearch/json?';
  var key = 'AIzaSyA-6VO2s5NXBqOPSUgJZf_G9IDVhwnS97E';
  var url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?location='+latitude+','+longitude+'&radius=500&query=wine&key='+ key

 request(url,function(err, response,body){
  var parsed = JSON.parse(body);
  console.log(parsed);
  var returnData = {
    'business_name': parsed.results[0].name,
    'place_id': parsed.results[0].place_id,
    'lat': parsed.results[0].geometry.location.lat,
    'lng': parsed.results[0].geometry.location.lng,
    'address': parsed.results[0].formatted_address,
    'price_level': parsed.results[0].price_level,

  }
res.send(returnData);
  // var returnData = {
  //   'name': body.results
  // }
 })
})





module.exports = router;
