var passport = require('passport');
var User = require('../lib/users.js');
var express = require('express');
var router = express.Router();

router.route('/register').get(function(req, res, next){
    res.render('register', {});
  }).post(function(req, res, next){
    User.register(new User({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email
    }), req.body.password, function(err, user){
      if(err){
        return res.render('register', {
          user: user
        });
      }
      req.login(user, function(err){
        res.redirect('/');
      });
    });
  });

router.get('/login', function(req, res, next){
  res.render('login', {user: req.user});
});

router.post('/login', passport.authenticate('local'), function(req, res ,next){
  res.redirect('/');
});

router.all('/logout', function(req, res, next){
  req.logout();
  res.redirect('/');
});

module.exports = router;
