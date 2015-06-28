var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nope');

var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var app = express();

var jade = require('jade');
var fs = require('fs');

var User = require('./lib/users.js');
var Post = require('./lib/posts.js');

app.set('view engine', 'jade');
app.set('views', './templates');

var comments = require('./routes/comments.js');
var users = require('./routes/users.js');


/* USERS ROUTE FOR DEV PURPOSES ONLY */
app.get('/users', function(req, res) {
  User.find({})
    .populate('posts')
    .exec(function(error, userList) {
      res.render('users', {
        users: userList
      });
    });
});

/*ROUTE TO RENDER HOME PAGE*/
app.get('/', function(req, res) {
  res.render('home')
});

/*FOR TESTING: ROUTE TO RENDER MODAL*/
app.get('/modal', function(req, res) {
  res.render('modal-form')
});

/*FOR TESTING: ROUTE TO RENDER USER PROFILE*/
app.get('/userprofile', function(req, res) {
  res.render('user-profile')
});

/*FOR TESTING: ROUTE TO RENDER USER FEED*/
app.get('/userfeed', function(req, res) {
  res.render('user-feed')
});

/*FOR TESTING: ROUTE TO RENDER HALL OF FAME*/
app.get('/halloffame', function(req, res) {
  res.render('hall-of-fame')
});

/*FOR TESTING: ROUTE TO RENDER WHITE NOISE FEED*/
app.get('/whitenoise', function(req, res) {
  res.render('white-noise-feed')
});


app.post('/users', jsonParser);
app.post('/users', function(req, res) {
  User.create(req.body, function(error, user) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      fs.readFile('./templates/user.jade', 'utf8', function(err, data) {
        if (err) {
          res.sendStatus(400);
        };
        var userCompiler = jade.compile(data);
        var html = userCompiler(user);
        res.send(html);
        res.status(201);
      });
    };
  });
});

//using an express method, static
//that creates middlewear that serves up static files
//along with our html
//references the public folder
//returns static files back to browser
app.use(express.static(__dirname + '/public'));


/* END USERS ROUTE */

// mount the apiRouter onto our instance of express
app.use('/user/', comments);
app.use('/user/', users);

//app variable is used to listen but not as variable
var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
