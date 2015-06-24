var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//requires the comment schema
var Comment = require('./comments.js')

var postSchema = new mongoose.Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
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
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment' }],
  haters: [String]
});

//Create a post model
var Post = mongoose.model('Post', postSchema);

// Make post a constructor function
// available outside the file by exporting
module.exports = Post;
