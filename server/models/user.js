var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

// set mongoose's promise library to ES2015 Promises
mongoose.Promise = Promise;

var recordSchema = new mongoose.Schema({
  artist:      String,
  album:       String,
  genre:       String,
  year:        String,
  image:       String,
  label:       String,
  condition:   String,
  description: String,
  price:       Number
});

var userSchema = new mongoose.Schema({
  email:   String,
  password: String,
  likes:    Number,
  records: [recordSchema]
});

userSchema.plugin(require('mongoose-bcrypt'));

var User = mongoose.model('User', userSchema);

module.exports = User;
