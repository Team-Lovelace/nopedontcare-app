var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nope');

var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var app = express();
var comments = require('./routes/comments.js');
var users = require('./routes/users.js');

// mount the apiRouter onto our instance of express
app.use('/user/', comments);
app.use('/user/', users);

//app variable is used to listen but not as variable
var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
