'use strict';

//Make sure the document is ready before applying jQuery library
$(document).ready(function() {

  //Get Bootstrap dropdowns to work
  $('.dropdown-toggle').dropdown();

  $('#nope-button').click(function() {
    $('#nope-gif').show();
    $('#nope-button').hide();
  });

// Login Modal Submission
  $('#loginButton').click(function(){
    var data = {};
    data.username = $('#usernameLogin').val();
    data.password = $('#passwordLogin').val();
    $.post('/auth/login', data, function(){
      location.reload();

  // $('#nope-submit').on('click', function(event){
  //   var nope = {
  //     caption: $('#postContent').val()
  //   };
  //  $.ajax({
  //     method: 'POST',
  //     url: '/nopes',
  //     data: JSON.stringify(nope),
  //     contentType: "application/json; charset=utf-8"
  //   }).done(function(response){
  //     console.log(response);
  //     $('.postContainer').prepend(response);
  //   });
  // });

// Signup Modal Submission
  $('#signUpButton').click(function(){
    var data = {};
    data.username = $('#username').val();
    data.name = $('#name').val();
    data.email = $('#email').val();
    data.password = $('#password').val();
    data.phonenumber = $('#phonenumber').val();
    data.bio = $('#bio').val();

    $.post('/auth/register', data, function(){
      location.reload();
      });
    });
}); //End of document ready
