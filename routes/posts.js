var express = require('express');
var router = express.Router();
var User = require('../lib/users.js');
var Post = require('../lib/posts.js');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

//NEED POSTS TEMPLATE TO VIEW
router.get('/:username/nopes', function(req, res){
  User.find({userName: req.params.username})
  .populate('posts')
  .exec(function(error, postList){
    console.log(postList);
    res.render('posts', {posts: postList});
  });
});

module.exports = router;
