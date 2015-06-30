'use strict';

//Make sure the document is ready before applying jQuery library
$(document).ready(function() {

  //Get Bootstrap dropdowns to work
  $('.dropdown-toggle').dropdown();

  // Tooltip only Text
  $('.masterTooltip').hover(function() {
    // Hover over code
    var title = $(this).attr('title');
    $(this).data('tipText', title).removeAttr('title');
    $('<p class="tooltip"></p>')
      .text(title)
      .appendTo('body')
      .fadeIn('slow');
  }, function() {
    // Hover out code
    $(this).attr('title', $(this).data('tipText'));
    $('.tooltip').remove();
  }).mousemove(function(e) {
    var mousex = e.pageX + 20; //Get X coordinates
    var mousey = e.pageY + 10; //Get Y coordinates
    $('.tooltip')
      .css({
        top: mousey,
        left: mousex
      });
  });


  // $('#nope-button').click(function() {
  //   $('#nope-gif').show(); // Show the one content you want to display
  // });

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
    });
  });

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
