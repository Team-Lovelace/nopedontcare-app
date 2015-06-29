var config = {};

config.env = 'development';
config.hostname = 'localhost';
config.serverPort = 3000;

config.authCallbackUrl = '';
config.authStrategy = 'local';

// cookies

config.cookieOptions = {};

// mongo database

config.mongo = {};
config.mongo.dbUrl = 'mongodb://localhost/nope';

// authentication keys & such that may vary from environment
// to environment but must never be committed to github
//
// may be stored in config/secrets.json
// but we prefer them in environment variables

config.secrets = {};

// config.secretNames = [
//   'GITHUB_CLIENT_SECRET',
//   'GITHUB_CLIENT_ID',
//   'SESSION_KEY'
// ];

module.exports = config;
