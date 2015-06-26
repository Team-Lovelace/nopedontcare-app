var config = require('./config.global.js');

// do we have a secret keys file?

try {
  var jsonKeys = require('./secrets.json');
} catch (e) {
  if (e.code !== 'MODULE_NOT_FOUND') {
    throw e;
  }
}

config.secretNames.forEach(function(name) {
  if (process.env[name] !== undefined) {
    config.secrets[name] = process.env[name];
  } else if (jsonKeys[name] !== undefined) {
    config.secrets[name] = jsonKeys[name];
  } else {
    console.warn('No value found for secret %s', name);
  }
});

module.exports = config;
