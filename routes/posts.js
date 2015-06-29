var express = require('express');
var router = express.Router();
var User = require('../lib/users.js');
var Post = require('../lib/posts.js');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var fs = require('fs');
var jade = require('jade');
var moment = require('moment');

//NEED POSTS TEMPLATE TO VIEW
router.get('/:username/nopes', function(req, res){
  User.find({userName: req.params.username})
  .populate('posts')
  .exec(function(error, postContainer){
    console.log(post);
    res.render('user-feed', {posts: postContainer});
  });
});

router.get('/:username/nopes/:id', function(req, res){
  Post.find({_id: req.params.id})
  .populate('userName', 'post')
  .exec(function(error, post){
    console.log(post);
    res.json(post);
  });
});

router.post('/:username/nopes', jsonParser);
router.post('/:username/nopes', function(req, res){
  User.findOne({userName: req.params.username}, function(error, user){
    if (error){
      console.log(error);
    }
    var post = new Post({
      author:user._id,
      caption: req.body.caption,
      pubDate: moment().format()
    });
    post.save(function(error){
      if (error){
        console.error(error);
      }
      user.posts.push(post._id);
      user.save(function(error){
        if (error){
          console.error(error);
          return res.sendStatus(400);
        }
        fs.readFile('./templates/post-template.jade', 'utf8', function (err, data) {
          if (err){
            res.sendStatus(400);
          };
          var postCompiler = jade.compile(data);
          var html = postCompiler(post);
          res.send(html);
          res.status(201);
        });
     });
    });
  });
});

router.delete('/:username/nopes/:id', function(req, res){
  User.findOne({userName: req.params.username}, function(error, user){
    if (error){
      console.error(error);
    }
    user.posts.splice(user.posts.indexOf(req.params.id), 1);
    user.save();
    Post.remove({
    _id: req.params.id
    },
    function(error){
      if(error){
        console.error(error);
        res.sendStatus(400);
      }else{
        res.sendStatus(204);
        console.log('deleted nope!');
      }
    });

  })

});

router.patch('/:username/nopes/:id', jsonParser);
router.patch('/:username/nopes/:id', function(req, res){
  Post.findOne({_id: req.params.id}, function(error, post){
    if (error){
      console.error(error);
      res.sendStatus (400);
    } else {
      console.log(post);
      console.log(req.body);
      post.caption = req.body.caption;
      post.save(function(error){
        if (error){
          console.log(error);
          res.sendStatus(400);
        }
        res.sendStatus(200);
      });
    }
  });
});

module.exports = router;
