var async = require('async');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nope');

var Comment = require('../lib/comments.js');
var Post = require('../lib/posts.js');
var User = require('../lib/users.js');

async.series([

    // first: clean everything out of the posts collection

    function(done) {
      User.find({}, done);
    },

    // create a post
    // pubDate is year, month, day
    function(done) {
      User.findOne({
          userName: 'courtney'
        },
        function(error, user) {
          //If user.posts is falsy
          //Create an array for user posts
          if (error) {
            console.error(error);
          }
          if (!user.posts) {
            user.posts = [];
          }
          post = new Post({
            author: user._id,
            pictures: 'http://i.imgur.com/ufx7hP0.jpg',
            pubDate: '150623',
            caption: 'Worst day ever.',
            haters: ['832fysz']
          });

          post.save(function(err){
            if(err){
              console.error(err);
            }
            user.posts.push(post._id);
            user.save(function(err){
              if(err){
                console.error(err);
              }
              done();
            });
          });
        });

    }
  ],


  function(error) {
    if (error) {
      console.error(error);
    }
    mongoose.disconnect();
  }
);
