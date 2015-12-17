var mongoose = require('mongoose');

// Use different database URIs based on whether an env var exists.
var dbUri = process.env.MONGOLAB_URI

mongoose.connect(dbUri);

module.exports = mongoose;
