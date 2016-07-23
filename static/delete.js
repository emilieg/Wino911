$(function(){
  $('#delete-favorite').click(e) {
    e.preventDefault();
    $ajax({
      url: '/favorites/:id',
      method: 'DELETE',
      data: {
        business: business_name,
        address: business_address,
      }
    })
  }
})