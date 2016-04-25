//Search for user location/geo locate

var latitude;
var longitude;


 $( document ).ready(function() {
    
  
  // geoFindMe() {
  var output = document.getElementById("out");
  console.log('button clicked');

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
     latitude  = position.coords.latitude;
     longitude = position.coords.longitude;
    //make global variables 
    // attach to user session as obj 
    //req.session.latitude

    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
    console.log(output.innerHTML);

    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

    output.appendChild(img);
  };

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  };

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);

});

//disable button until page done loading and geoFindMe is done


//Start search when button is clicked

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










