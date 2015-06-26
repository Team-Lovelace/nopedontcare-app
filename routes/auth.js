var passport = require('passport');
var User = require('../lib/users.js');
var express = require('express');
var router = express.Router();

router.all('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

router.get('/', function(req, res, next) {
  res.render('login-options', {user: req.user});
});


router.get('/facebook', passport.authenticate('facebook', {
  scope: ['user_status', 'user_checkins']
}));

router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/contacts',
  failureRedirect: '/auth'
}));

router.get('/twitter', passport.authenticate('twitter', {
  scope: ['user_status', 'user_checkins']
}));

router.get('/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/contacts',
  failureRedirect: '/auth'
}));

module.exports = router;
