$(function() {

  //add to favorites list
  $( "#add_to_fav" ).click(function(e) {
    e.preventDefault();
    $(this).find('.glyphicon').css("color", "#ff4d4d");
    var business_name = $('#business_name').html(); 
    var business_address = $('#business_address').html();
    $.ajax({
      url: '/favorites',
      method: 'POST',
      data: {
        business: business_name,
        address: business_address,  
      },
      success: function(xhr, status, data){       
        data.google_maps.forEach(function(marker) {
          var position = new google.maps.LatLng(marker.lat, marker.lng);
          var googleMarker = new google.maps.Marker({
            position: position,
            title: marker.name,
            map: map
          });
        });
      }
    });
  });
})

