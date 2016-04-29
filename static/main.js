
/////////////////////////////////////////////////////////////////////////////////////////////////////////
var latitude;
var longitude;
var latt;
var lng;
var place;
var place_id={};
var output = document.getElementById("out");
var map;
/////////////////////////////////////////////////////////////////////////////////////////////////////////

//PAGE LOADS 
//FIND MY LOCATION
$( document ).ready(function() {
  if (window.location.pathname === '/search') {
    getCoord();  
  }
});


function getCoord (){
  navigator.geolocation.getCurrentPosition(success, error);
};

  function success(position) {
     latitude  = position.coords.latitude;
     longitude = position.coords.longitude;

    if (latitude && longitude){
    callGooglePlaces();
  
  } else {
    throw ("could not locate")
  }
  };

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  };  


  function geoFindMe() {
  // var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }
  output.innerHTML = "<p>Locating…</p>";  
}

//IF MY LOCATION FOUND: pass coordinates to YELP to search for wine (API call)


function callGooglePlaces(){
    $.ajax({
    url: '/yelp/search',
    method: 'GET',
    data: {
      longitude: longitude,
      latitude: latitude,
    },
    success: function(xhr, status, returnData){
      var parsed_obj = JSON.parse(returnData.responseText);
      var google = parsed_obj.google_maps;

      console.log('returnData:', returnData);

      var darkSky = parsed_obj.dark_sky;

      var business = google.business_name;
      
      place_id = {placeId: google.place_id};
     
      latt= google.lat;
   
      lng= google.lng;
   
      var address = google.address;
  
      var price_level = google.price_level;

      var weather = darkSky.summary;

      var temperature = darkSky.temperature;
      console.log(temperature);

      //jquery dom stuff here
      $('#business_name').html(business);
      $('#business_address').html(address);
      if (price_level !== undefined ) {
      $('#price_level').html("Price Level : " + price_level);
       };
      $('#weather').html(weather);
      $('#temperature').html(temperature + "°");
        if (temperature >= 60){ 
       $("#img").attr("src","glass-with-wine-yellow.png"); 
       }; 

      initMap();    
    }
  })
  }


//ONCE COORDINATES from Google Places ARE RECEIVED CALL GOOGLE DIRECTIONS


function initMap() {
        if (latitude && longitude) {
        console.log('latitude' + latitude + 'longitude' + longitude);
                                           
        var myLatlng = new google.maps.LatLng(latitude,longitude); 
       
        
        var desLatlng = new google.maps.LatLng(latt,lng);

        
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;

        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: {lat: 41.85, lng: -87.65}
        });
        //check if map has a callback
        
        directionsDisplay.setMap(map);


        var onChangeHandler = function() {

          calculateAndDisplayRoute(directionsService, directionsDisplay);
        };

        // if (myLatlng) {
          onChangeHandler();
        // }
        // $("#loading").hide;

      }

      function calculateAndDisplayRoute(directionsService, directionsDisplay) {

        directionsService.route({
          
          origin: myLatlng,
          destination: place_id,
          travelMode: google.maps.TravelMode.WALKING
        }, function(response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            // $("i").fadeOut();
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
      }


///////////////////////////////////////////////////////////////////////////////////





      