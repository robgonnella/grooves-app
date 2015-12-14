var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var recordSchema = new mongoose.Schema({
  artist:      String,
  album:       String,
  genre:       String,
  year:        Number,
  recordLabel: String,
  condition:   String,
  description: String
});

var userSchema = new mongoose.Schema({
  email:   String,
  password: String,
  likes:    Number,
  records: [recordSchema]
});

var User = mongoose.model('User', userSchema);

module.exports = User;
