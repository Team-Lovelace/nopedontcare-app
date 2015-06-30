'use strict';

//Make sure the document is ready before applying jQuery library
$(document).ready(function() {

  //Get Bootstrap dropdowns to work
  $('.dropdown-toggle').dropdown();

  $('#nope-button').click(function() {
    $('#nope-gif').show();
    $('#nope-button').hide();
  });


  // $('#nope-submit').on('click', function(event) {
  //   debugger;
  //   var nope = {
  //     caption: $('#postContent').val(),
  //     file: $('#file')[0].files[0]
  //   };
  //   $.ajax({
  //     method: 'POST',
  //     url: 'http://localhost:3000/nopes',
  //     data: nope,
  //     contentType: "multipart/form-data",
  //   }).done(function(response) {
  //     console.log(response);
  //     $('.postContainer').prepend(response);
  //   });
  // });
}); //End of document ready
