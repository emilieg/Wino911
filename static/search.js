$(function() {
  console.log("search")

  //write click handler function
  $( "#add_to_fav" ).click(function(e) {
      e.preventDefault();
      $(this).find('.glyphicon').css("color", "#ff4d4d");
      console.log("heard click");
      var business_name = $('#business_name').html(); 
      console.log("business_name", business_name);
      var business_address = $('#business_address').html();
      console.log(business_address);
      $.ajax({
        url: '/favorites',
        method: 'POST',
        data: {
          business: business_name,
          address: business_address,  
        },
        success: function(xhr, status, data){
          window.location = '/favorites';
        }
      })
  });
})

