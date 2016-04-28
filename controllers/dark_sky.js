var express = require('express');
var db = require("../models");
var ejsLayout = require("express-ejs-layouts");
var request = require('request');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var router = express.Router();





// router.get('/result', function(req,res){
//   //request('https://api.forecast.io/forecast/'+ process.env.KEY + '/47.560204399999996,-122.36074060000001', function(err, res, body){
//   request('https://api.forecast.io/forecast/f8cfb18b542d7a98dbc35f73134d623d/47.56,-122.36', function(err,response, body){  
//     console.log("req dark_Sky");
//     if(!err && response.statusCode == 200){
//       console.log("dark_Sky" ,body);
//       res.send(body);
//     }   
//   })
// })










module.exports = router;