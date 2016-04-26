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
  getCoord();

});


function getCoord (){
  ('inside getCoord');
  navigator.geolocation.getCurrentPosition(success, error);
};

  function success(position) {
     latitude  = position.coords.latitude;
     longitude = position.coords.longitude;
    console.log("latitude & longitude: " + latitude + longitude);
    if (latitude && longitude){
    callYelp();
    console.log('calling Yelp' + callYelp);
    // initMap();
    console.log('calling initMap' + initMap);
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
    success: function(xhr, status, returnData){
      console.log('success data ' , returnData);
      var parsed_obj = JSON.parse(returnData.responseText);
      console.log(parsed_obj);
      initMap();    
    }
  })
  }


//ONCE COORDINATES from YELP ARE RECEIVED CALL GOOGLE DIRECTIONS




function initMap() {
        if (latitude && longitude) {
        console.log('latitude' + latitude + 'longitude' + longitude);
                                           
        var myLatlng = new google.maps.LatLng(latitude,longitude); 
        console.log(myLatlng);                                     
        
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: {lat: 41.85, lng: -87.65}
        });
        
        directionsDisplay.setMap(map);


        var onChangeHandler = function() {
          console.log('inside OnChangeHandler')
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        };

        if (myLatlng) {
          onChangeHandler();
        }

      }

      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        console.log('inside calculateAndDisplayRoute');
        directionsService.route({
          origin: myLatlng,
          destination: 'Chicago',
          travelMode: google.maps.TravelMode.DRIVING
        }, function(response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
      }







