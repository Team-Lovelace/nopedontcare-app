'use strict';

//Make sure the document is ready before applying jQuery library
$(document).ready(function() {

  //Get Bootstrap dropdowns to work
  $('.dropdown-toggle').dropdown();

  $('#nope-button').click(function() {
    $('#nope-gif').show();
    $('#nope-button').hide();
  });


  $('#nope-submit').on('click', function(event){
    var nope = {
      caption: $('#postContent').val()
    };
   $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/user/courtney/nopes',
      data: JSON.stringify(nope),
      contentType: "application/json; charset=utf-8"
    }).done(function(response){
      console.log(response);
      $('.postContainer').prepend(response);
    });
  });
}); //End of document ready
