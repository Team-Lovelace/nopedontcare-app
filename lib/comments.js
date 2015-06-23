var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  }
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
+
+// Make post a constructor function
+// available outside the file by exporting
+module.exports = Comment;
