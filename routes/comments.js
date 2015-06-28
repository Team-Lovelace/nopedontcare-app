var express = require('express');
var router = express.Router();
var User = require('../lib/users.js');
var Post = require('../lib/posts.js');
var Comment = require('../lib/comments.js');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

router.get('/', function(req, res) {
  console.log("user!");
});

router.get('/:username/nopes/:id/comments', function(req, res) {
  Post.find({_id: req.params.id})
  .populate('comments')
  .exec(function(error, comment){
   console.log(comment);
   res.json(comment);
  });
});

// router.get('/:username/nopes/:id/comments', function(req, res){
//   User.findOne({userName: req.params.username}, function(error, user){
//     if (error){
//       console.error(error);
//     }
//     Post.find({_id: req.params.id})
//     .populate('comments')
//     .exec(function(error, comment){
//       console.log(comment);
//       res.json(comment);
//     });
//   })
// });
router.post('/:username/nopes/:id/comments', jsonParser);
router.post('/:username/nopes/:id/comments', function(req, res) {
  Post.findOne({_id: req.params.id}, function(error, post){
    if (error){
      console.log(error);
    }
    User.findOne({user: req.params.user}, function(error, user){
      if (error){
        console.error(error)
      }
      comment = new Comment({
       author:user._id,
       body:req.body.body,
       pubDate:req.body.pubDate

      });
      comment.save(function(error){
        if (error){
          console.error(error);
        }
        post.comments.push(comment._id);
        post.save(function(error){
          if (error){
            console.error(error);
            res.sendStatus (400);
          }
          res.json(comment);
        });
      });
    });
  });
    console.log("We posted it");
});

router.patch('/:username/nopes/:post_id/comments/:id', jsonParser);
router.patch('/:username/nopes/:post_id/comments/:id', function(req, res) {
  Comment.findOne({_id: req.params.id}, function(error, comment){
    if (error){
      console.error(error);
      res.sendStatus (400);
    } else {
      console.log(comment);
      console.log(req.body);
      comment.body = req.body.body;
      comment.save(function(error){
        if (error){
          console.log(error);
          res.sendStatus(400);
        }
        res.sendStatus(200);
      });
    }
  });
  console.log("We patch it");
});

router.delete('/:username/nopes/:post_id/comments/:id', function(req, res) {
  Post.findOne({_id: req.params.post_id}, function(error, post){
    if (error){
      console.error(error);
    }
    post.comments.splice(post.comments.indexOf(req.params.id), 1);
    post.save();
    Comment.remove({
      _id:req.params.id
    }, function(error){
      if (error){
        console.error(error);
        res.sendStatus(400);
      }else{
        res.sendStatus(204);
        console.log('deleted comment!');
      }
    });

  })
});




module.exports = router;
