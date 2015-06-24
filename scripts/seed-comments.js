var async = require('async');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nope');

var Comment = require('../lib/comments.js');
var Post = require('../lib/posts.js');
var User = require('../lib/users.js');

async.series([
  function(done){
    Post.find({}, done);
  },
  function(done){
    User.findOne({
    name: 'courtney'
    },
    function(error, user){
      if (error) {
        console.error(error);
      }
      Post.findOne({

        caption: 'Worst day ever.'
      },
      function(error, post){
        if (error) {
          console.error(error);
        }
        if (!post.comments) {
          post.comments = [];
        }
        comment = new Comment({
          author: user,
          body: "omg he suck at driving",
          pubDate: "150624"
        });
        comment.save(function(err){
          if(err){
            console.error(err);
          }
          post.comments.push(comment._id);
          post.save(function(err){
            if(err){
            console.error(err);
            }
            done();
          });
        });
      });
    }
  )}

  ],

  function(error) {
    if (error) {
      console.error(error);
    }
    mongoose.disconnect();
  }
 );
