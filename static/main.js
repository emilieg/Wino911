// //Search for user location/geo locate

// var latitude;
// var longitude;


//  $( document ).ready(function() {
     
//   var output = document.getElementById("out");
//   console.log('doc loaded');

//   if (!navigator.geolocation){
//     output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
//     return;
//   }

//   $('#search_btn').click(function(e){

//   $.ajax({
//     url: '/yelp/search',
//     method: 'GET',
//     data: {
//       longitude: longitude,
//       latitude: latitude,
//     },
//     success: function(xhr, status, data){
//       console.log(data);
//     }
//   })
// });
  
// });


// //1.fires first from script file in search.ejs
// function loadMap(){
//   navigator.geolocation.getCurrentPosition(geosuccess, error);
// }

// //geosuccess gets called next
// function geosuccess(position) {
//    latitude  = position.coords.latitude;
//    longitude = position.coords.longitude;
//    console.log('latitude: ' +latitude);
//    console.log('longitude: '+ longitude);

//     //API call to get google img
//     var img = new Image();
//     img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

//   // fire initMap on success
//   initMap();
// };

// var map;
// function initMap() {
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: latitude, lng: longitude},
//     zoom: 14
//   });
// }


// function error() {
//   output.innerHTML = "Unable to retrieve your location";
// };

/////////////////////////////////////////////////////////////////////////////////////////////////////////
var latitude;
var longitude;

//PAGE LOADS 
//FIND MY LOCATION
$( document ).ready(function() {
  loadMap();

});


function loadMap (){
  navigator.geolocation.getCurrentPosition(success, error);
};

  function success(position) {
     latitude  = position.coords.latitude;
     longitude = position.coords.longitude;
    console.log("latitude & longitude: " + latitude + longitude);
    if (latitude && longitude){
    callYelp();
  } else {
    throw ("could not locate")
  }
  };

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  };  


  function geoFindMe() {
  var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }
  output.innerHTML = "<p>Locating…</p>";  
}

//IF MY LOCATION FOUND: pass coordinates to YELP to search for wine (API call)


function callYelp(){
    $.ajax({
    url: '/yelp/search',
    method: 'GET',
    data: {
      longitude: longitude,
      latitude: latitude,
    },
    success: function(xhr, status, data){
      console.log('data inside callYelp' + data);
    }
  })
  }


//ONCE COORDINATES from YELP ARE RECEIVED CALL GOOGLE DIRECTIONS

// var directions= DirectionsService {
//   origin: LatLng | String | google.maps.Place,
//   destination: LatLng | String | google.maps.Place,
//   travelMode: google.maps.TravelMode.WALKING,
//   transitOptions: TransitOptions,
//   drivingOptions: DrivingOptions,
//   unitSystem: UnitSystem,
//   waypoints[]: DirectionsWaypoint,
//   optimizeWaypoints: Boolean,
//   provideRouteAlternatives: Boolean,
//   avoidHighways: Boolean,
//   avoidTolls: Boolean,
//   region: String
// }










