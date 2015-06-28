var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = require('./posts.js')

var commentSchema = new mongoose.Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  body: {
    type: String,
    required: true
  },
  pubDate: {
    type: String,
    required: true
  }
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
