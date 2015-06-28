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

router.post('/:username/nopes/:id/comments', function(req, res) {
  console.log("We posted it");
});

router.put('/:username/nopes/:post_id/comments/:id', function(req, res) {
  console.log("We put it");
});

router.delete('/:username/nopes/:post_id/comments/:id', function(req, res) {
  console.log("We deleted it");
});




module.exports = router;
