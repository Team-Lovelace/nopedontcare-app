var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Post = require('./posts.js');

var userSchema = new mongoose.Schema({
  // userName: {
  //   type: String,
  //   required: true
  // },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: /\S+@\S+\.\S+/
  },
  bio: {
    type: String
  },
  // profilePic: {
  //   type: String,
  //   required: true
  // },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]

});

userSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', userSchema);

module.exports = User;
