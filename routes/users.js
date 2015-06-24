var express = require('express');
var router = express.Router();
var User = require('../lib/users.js');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

router.get('/', function(req, res) {
  console.log("user!");
});

router.get('/:userName', function(req, res) {
  console.log("We got a username");
  User.find({
    userName: req.params.username
  }, function(error, user) {
    res.json(user);
  });
});

router.patch('/:userName', jsonParser);
router.patch('/:userName', function(req, res) {
  //using findOne/.save method so that it doesn't bypass validation
  User.findOne({
    userName: req.params.userName
    //re.body is the json that comes in
  }, req.body, function(error, user) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      user.userName = req.body.userName || user.userName;
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.bio = req.body.bio || user.bio;
      user.profilePic = req.body.profilePic || user.profilePic;
      user.save(function(error) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        }
        res.sendStatus(200);
      });
    }
  });
});

router.delete('/:userName', function(req, res) {
  console.log("We deleted it");
});




module.exports = router;
