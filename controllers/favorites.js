// var express = require('express');
// var db = require("../models");
// var ejsLayout = require("express-ejs-layouts");
// var request = require('request');
// var bodyParser = require('body-parser');
// var flash = require('connect-flash');
// var router = express.Router();

// router.get('/search', function(req, res) {
//   console.log("current user on search route: ", req.currentUser);
//   if(req.currentUser) {
//     res.render('search', {
//       // business: business
//     });
//   } else {
//     req.flash('danger', ' You must be loggd in'); 
//     res.redirect('/');
//   }
// });

// router.get('/favorites',function(req,res){
//   console.log("favorites current user is: ", req.session.userId);
//   if(req.currentUser) {
//     db.favorite.findAll({
//       where: {
//         userId: req.session.userId
//       }
//     }).then(function(favorites) {
//     res.render('favorites', {
//       favorites: favorites
//     });
//     console.log("favorites are: ", favorites);
//   });
// }
// });




// router.get('/about', function(req,res){
//   res.render('about')
// })

// router.post('/favorites', function(req,res){
//   console.log("userID:", req.session.userId);
//   db.user.findOrCreate({
//     where: {
//     id: req.session.userId
//   }}).spread(function(user, created){
//     db.favorite.findOrCreate({where:{
//       business: req.body.business,
//       address: req.body.address
//     }}).spread(function(favorite,created){
//      console.log("favorite:", favorite.business);
//      user.addFavorite(favorite);
//     });
//   });
// });

// router.delete('favorites/:id', function(req,res){
//   //code here to delete a favorite from db
//   //data will come via req.params.id 
//   console.log("Req.Param ID: ", req.params.id);
//   db.favorite.find({where: {id: req.params.id}}).then(function(favorite){
//     favorite.destroy().then(function(){ res.send({msg: 'deleted'})});
//   }).catch(function(err){
//     res.send({msg: 'error'});
//   })
// });


// module.exports = router;