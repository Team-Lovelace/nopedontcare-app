var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
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
