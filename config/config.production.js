var config = require('./config.global.js');

// make any production-specific changes here

config.env = 'production';
config.hostname = 'desolate-bayou-5211.herokuapp.com';
config.serverPort = process.env.PORT; // heroku is particular

config.authCallbackUrl = 'https://desolate-bayou-5211.herokuapp.com/auth/facebook/callback';
config.authStrategy = 'facebook';

// cookie settings

config.cookieOptions.secure = true;

// mongo database

config.mongo.dbUrl = "mongodb://nopeapp:noireallydontcare@ds041841.mongolab.com:41841/nope";

// make sure we can fetch our secrets from the environment

var missingSecrets = [];
config.secretNames.forEach(function(name) {
  if (process.env[name] !== undefined) {
    config.secrets[name] = process.env[name];
  } else {
    missingSecrets.push(name);
  }
});

if (missingSecrets.length > 0) {
  throw new Error('Cannot start server without secrets: ' + missingSecrets.join(', '));
}

module.exports = config;
