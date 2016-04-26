//Search for user location/geo locate

var latitude;
var longitude;


 $( document ).ready(function() {
     
  var output = document.getElementById("out");
  console.log('doc loaded');

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  $('#search_btn').click(function(e){

  $.ajax({
    url: '/yelp/search',
    method: 'GET',
    data: {
      longitude: longitude,
      latitude: latitude,
    },
    success: function(xhr, status, data){
      console.log(data);
    }
  })

});
  
});


var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: latitude, lng: longitude},
    zoom: 14

  });console.log(latitude);
}


function loadMap(){
  navigator.geolocation.getCurrentPosition(geosuccess, error);
}


function geosuccess(position) {
   latitude  = position.coords.latitude;
   longitude = position.coords.longitude;
   console.log(latitude);


  var img = new Image();
  img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

  // fire initMap on success
  initMap();
};

function error() {
  output.innerHTML = "Unable to retrieve your location";
};














