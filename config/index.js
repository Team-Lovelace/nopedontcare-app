var util = require('util');
var env = process.env.NODE_ENV || 'development';
var configFileName = './config.' + env + '.js';
var cfg = require(configFileName);

module.exports = cfg;
