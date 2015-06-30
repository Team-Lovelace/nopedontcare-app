var mongoose = require('mongoose');
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var jsonParser = bodyParser.json();
var passport = require('passport');
var AWS = require('aws-sdk');
require('dotenv').load();

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY_ID
});

var s3 = new AWS.S3();

var LocalStrategy = require('passport-local').Strategy;

var MongoURI = process.env.MONGOURI || 'mongodb://localhost/nope';
var Port = process.env.PORT || 3000;
mongoose.connect(MongoURI, function(err, res) {
  if (err) {
    console.log('ERROR connecting to DB' + err);
  } else {
    console.log('Mongo Connected');
  }
});

var jade = require('jade');
var fs = require('fs');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(methodOverride('_method'));
app.use(cookieParser());

app.use(session({
  store: new MongoStore({
    url: MongoURI
  }),
  secret: 'butts',
  resave: true,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
var User = require('./lib/users.js');
var Post = require('./lib/posts.js');

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set('view engine', 'jade');
app.set('views', './templates');

var comments = require('./routes/comments.js');
var users = require('./routes/users.js');
var posts = require('./routes/posts.js');
var auth = require('./routes/auth.js');
var moment = require('moment');




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
  if(!req.user){
  console.log('Get Request for /');
  res.render('home');
  } else {
    console.log(req);
    res.render('user-profile', {user: req.user});
  }
});

/*FOR TESTING: ROUTE TO RENDER MODAL*/
app.get('/modal', function(req, res) {
  res.render('modal-form');
});

app.get('/userprofile', function(req, res){
  if(req.user){
    User.findOne({username: req.user.username})
    .populate('posts')
    .exec(function(error, user){
      console.log(user);
      res.render('user-profile', {user: user});
    });
  } else {
    res.redirect('/');
  }
});
/*FOR TESTING: ROUTE TO RENDER USER PROFILE*/
// app.get('/userprofile', function(req, res) {
//   res.render('user-profile', {user: req.user});
// });

/*FOR TESTING: ROUTE TO RENDER USER FEED*/
app.get('/userfeed', function(req, res) {
  if(req.user){
  res.render('user-feed');
  } else {
    res.redirect('/');
  }
});

/*FOR TESTING: ROUTE TO RENDER HALL OF FAME*/
app.get('/halloffame', function(req, res) {
  res.render('hall-of-fame');
});

/*FOR TESTING: ROUTE TO RENDER WHITE NOISE FEED*/
app.get('/whitenoise', function(req, res) {
  res.render('white-noise-feed');
});

/*FOR TESTING: ROUTE TO RENDER WHITE NOISE FEED*/
app.get('/about', function(req, res) {
  res.render('about');
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
        }
        var userCompiler = jade.compile(data);
        var html = userCompiler(user);
        res.send(html);
        res.status(201);
      });
    }
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
app.use('/user/', posts);
app.use('/auth/', auth);

//Multer Image Upload
/*Define dependencies.*/
var multer = require('multer');
var done = false;

/// move me downstream!!!!!!!!!!!
app.use(multer({
  dest: './uploads/',
  rename: function(pictures, src) {
    return src.replace(/\W+/g, '-').toLowerCase();
  },
  onFileUploadStart: function(file) {
    console.log(file.originalname + ' is starting ...')
  },
  onFileUploadComplete: function(file) {
    console.log(file.fieldname + ' uploaded to  ' + file.path)
    done = true;
  }
}));

// app.post('/nopes', jsonParser);

app.post('/nopes', function(req, res, next) {
  if (done == true) {
    next();
  }
});

app.post('/nopes', function(req, res, next) {
  fs.readFile(req.files.file.path, function(err, data) {
    var params = {
      Key: req.files.file.name,
      Body: data,
      Bucket: 'nopes'
    };
    s3.putObject(params, function(perr, pres) {
      if (perr) {
        console.log(perr)
        res.sendStatus(400);
      } else {
        if (!req.locals) {
          req.locals = {};
          req.locals.pictureSrc = req.files.file.name;
          next();
        } else {
          req.locals.pictureSrc = req.files.file.name;
          next();
        }
      }
    });
  });
});

app.post('/nopes', function(req, res) {
  User.findOne({
    username: req.user.username
  }, function(error, user) {
    if (error) {
      console.log(error);
    }
    var post = new Post({
      author: user._id,
      picture: req.locals.pictureSrc,
      caption: req.body.caption,
      pubDate: moment().format()
    });
    post.save(function(error) {
      if (error) {
        console.error(error);
      }
      user.posts.push(post._id);
      user.save(function(error) {
        if (error) {
          console.error(error);
          return res.sendStatus(400);
        }
        fs.readFile('./templates/post-template.jade', 'utf8', function(err, data) {
          if (err) {
            res.sendStatus(400);
          };
          post.username = user.username;
          var postCompiler = jade.compile(data);
          var html = postCompiler(post);
          res.send(html);
          res.status(201);
        });
      });
    });
  });
});
// END MOVE ME DOWNSTREAM!!!!

//app variable is used to listen but not as variable
var server = app.listen(Port, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
