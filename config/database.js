var mongoose = require('mongoose');

// Use different database URIs based on whether an env var exists.
var dbUri = process.env.MONGOLAB_URI
// var env = require('./environment');
// var dbUri = 'mongodb://localhost/' + env.SAFE_TITLE;

mongoose.connect(dbUri);

module.exports = mongoose;
