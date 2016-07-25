$(function(){
  $('#delete-favorite').click(function(e) {
    console.log("AJAX CALL");
    var url = $(this).attr('href');
    e.preventDefault();
    $.ajax({
      url: url,
      method: 'DELETE'
    }).done(function(){
      window.location.href='/favorites'
    })
  });
})