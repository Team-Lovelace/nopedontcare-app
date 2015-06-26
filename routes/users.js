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
  User.findOne({
    userName: req.params.userName
  }, function(error, user) {
    res.json(user);
  });
});

router.patch('/:userName', jsonParser);
router.patch('/:userName', function(req, res) {
  //using findOne/.save method so that it doesn't bypass validation
  User.findOne({
    name: req.params.userName
    //re.body is the json that comes in
  }, function(error, user) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      console.log(user);
      console.log(req.body);
      user.userName = req.body.userName || user.userName;
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.bio = req.body.bio || user.bio;
      user.profilePic = req.body.profilePic || user.profilePic;
      user.posts = req.body.posts || user.posts;
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
  User.remove({
    userName: req.params.userName
  }, function(error){
    if(error){
      console.log(error);
      res.sendStatus(400);
    }else{
      res.sendStatus(204);
    }
  });
});




module.exports = router;
