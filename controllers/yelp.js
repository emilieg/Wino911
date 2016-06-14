var express = require('express');
var db = require("../models");
var ejsLayout = require("express-ejs-layouts");
var request = require('request');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var router = express.Router();

router.get('/search', function(req,res){
  var latitude = req.query.latitude;
  var longitude = req.query.longitude;
  var api_call = 'https://maps.googleapis.com/maps/api/place/textsearch/json?';
  var key = process.env.GOOGLE_PLACES;
  var dark_sky_key = process.env.DARK_SKY_KEY;
  var url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?location='+latitude+','+longitude+'&radius=500&query=wine&key='+ key

 request(url,function(err, response,body){
  if (err) {
    res.send({message: "something went wrong with google maps api", error: err});
  }
  var parsed = JSON.parse(body);
  console.log("parsedGoogle:", parsed.results);
  var returnData = {
    'business_name': parsed.results[0].name,
    'place_id': parsed.results[0].place_id,
    'lat': parsed.results[0].geometry.location.lat,
    'lng': parsed.results[0].geometry.location.lng,
    'address': parsed.results[0].formatted_address,
    'price_level': parsed.results[0].price_level,

  }
  var darkSkyUrl = 'https://api.forecast.io/forecast/'+process.env.DARK_SKY_KEY+'/'+latitude+','+longitude;
  console.log(darkSkyUrl);
  request(darkSkyUrl, function(err,response, body){  
    console.log("req dark_Sky");
    if (err) {
      res.send({message: "something went wrong with dark sky", error: err});
    } else if(response.statusCode == 200){
 
      var parseDarkSky = JSON.parse(body);
      
      var darkSky = {
        'temperature': parseDarkSky.currently.temperature,
        'summary': parseDarkSky.currently.summary,
        'icon': parseDarkSky.currently.icon,
      }
      console.log("darkSky: ", darkSky);
      res.send({dark_sky: darkSky, google_maps: returnData});
      console.log('returnData', returnData);
    }  else {
      res.send(response);
    }
  })
 })
})



module.exports = router;
