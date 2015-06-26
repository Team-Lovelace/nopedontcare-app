var config = require('./config');
var mongoose = require('mongoose');
var MongoURI = config.mongo.dbUrl;
mongoose.connect(MongoURI);

var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var app = express();
var cookieParser = require('cookie-parser');

// Auth dependencies
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var findOrCreateProfile = require('./findOrCreateProfile');
var auth = require('./routes/auth.js');

var jade = require('jade');
var fs = require('fs');

var User = require('./lib/users.js');
var Post = require('./lib/posts.js');

app.set('view engine', 'jade');
app.set('views', './templates');

var comments = require('./routes/comments.js');
var users = require('./routes/users.js');
var posts = require('./routes/posts.js');


/* USERS ROUTE FOR DEV PURPOSES ONLY */
if (config.env === 'dev') {
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



app.post('/register', jsonParser);
app.post('/register', function(req, res) {
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
}
/* END USERS ROUTE */

app.use(cookieParser());
app.use(session({
  store: new MongoStore({url: MongoURI}),
  secret: 'learn node',
  resave: true,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());

passport.use(new TwitterStrategy({
  consumerKey: '...',
  consumerSecret: '...',
  callbackURL: "http://localhost:3000/auth/twitter/callback"
},
function(token, tokenSecret, profile, done){
  findOrCreateProfile({twitterId: profile.id}, profile, done);
}
));

passport.use(new FacebookStrategy({
  clientID: '1069353713094731',
  clientSecret: '7d7ea0bc01204e0248f81fd179a9c90e',
  callbackURL: config.authCallbackUrl
},
function(accessToken, refreshToken, profile, done){
  findOrCreateProfile({facebookID: profile.id}, profile, done);
}));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser);

// mount the apiRouter onto our instance of express
app.use('/user/', comments);
app.use('/user/', users);
app.use('/user/', posts);
app.use('/auth/', auth);

//app variable is used to listen but not as variable
var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
