var mongoose = require('mongoose');

//requires the comment schema
var commentSchema = require('./comments.js')

var postSchema = new mongoose.Schema({
  pictures: {
    type: String,
    required: true
  },
  pubDate: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  comments: [commentSchema],
  haters: [user_ids]
});

//Create a post model
var Post = mongoose.model('Post', postSchema);

// Make post a constructor function
// available outside the file by exporting
module.exports = Post;
