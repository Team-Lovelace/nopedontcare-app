var User = require('./lib/users.js');

var findOrCreateProfile = function(profileDetails, profile, done) {

  var facebook = false,
    twitter = false;

  if(profileDetails.twitterId) {
    twitter = true;
  }

  if(profileDetails.facebookId) {
    facebook = true;
  }

  User.findOne(profileDetails, function(err, user) {
    if (err || !user) {
        // create the user
        user = new User({
            username: profile.username,
            profile: profile
        });

        if(twitter) {
          user.twitterId = profile.id;
        } else if(facebook) {
          user.facebookId = profile.id;
        }

        user.save(done);
    } else {
        done(null, user);
    }
  });
};

module.exports = findOrCreateProfile;
