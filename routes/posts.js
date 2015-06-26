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

router.post('/:username/nopes', jsonParser);
router.post('/:username/nopes', function(req, res){
  User.findOne({userName: req.params.username}, function(error, user){
    if (error){
      console.log(error);
    }
    post = new Post({
      author:user._id
    });
    post.save(function(error){
      if (error){
        console.error(error);
      }
      user.posts.push(post._id);
      user.save(function(error){
        if (error){
        console.error(error);
        }
        res.json(post);
        });
     });
  });
});

module.exports = router;
