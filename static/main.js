
/////////////////////////////////////////////////////////////////////////////////////////////////////////
var latitude;
var longitude;
var latt;
var lng;
var place;
var place_id={};
// var des = new google.maps.Place('4f89212bf76dde31f092cfc14d7506555d85b5c7');
/////////////////////////////////////////////////////////////////////////////////////////////////////////


  // map = new google.maps.Map(document.getElementById('map'), {
  //     center: myLatlng2,
  //     zoom: 15
  //   });


// function createMarker(place) {
//   var placeLoc = place.geometry.location;
//   var marker = new google.maps.Marker({
//     map: map,
//     position: place.geometry.location
//   });

//   google.maps.event.addListener(marker, 'click', function() {
//     infowindow.setContent(place.name);
//     infowindow.open(map, this);
//   });
// }

 // var marker = new google.maps.Marker({
 //      map: map,
 //      place: {
 //        placeId: results[0].place_id,
 //        location: results[0].geometry.location
 //      }
 //    });



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
    callGooglePlaces();
  
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
      console.log(returnData);
      var business = parsed_obj.business_name;
      console.log(business);
      place_id = {placeId: parsed_obj.place_id};
      console.log(place_id);
       latt= parsed_obj.lat;
      console.log('latt', latt);
      lng= parsed_obj.lng;
      console.log('lng', lng);
      var address = parsed_obj.address;
      console.log("address", address);
      //jquery dom stuff here
      //click handler for db saving


      initMap();    
    }
  })
  }
//write click handler function



//ONCE COORDINATES from YELP ARE RECEIVED CALL GOOGLE DIRECTIONS


function initMap() {
        if (latitude && longitude) {
        console.log('latitude' + latitude + 'longitude' + longitude);
                                           
        var myLatlng = new google.maps.LatLng(latitude,longitude); 
        console.log(myLatlng);  

        
        var desLatlng = new google.maps.LatLng(latt,lng);
        console.log('desLatlng', desLatlng); 

        // var desId = new google.maps.Place('ChIJC2j55LNqkFQRRqBoRA_a_3A');
        // console.log('desId', desId); 
                                      
        
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

        // if (myLatlng) {
          onChangeHandler();
        // }

      }

      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        console.log('inside calculateAndDisplayRoute');

        directionsService.route({
          
          
          origin: myLatlng,
          // destination: desLatlng,
         destination: place_id,
         travelMode: google.maps.TravelMode.WALKING
        }, function(response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
      }







