var mongoose = require('../config/database'),
    User     = require('../models/user');

User.remove({}, function(error) {
  if(error) console.log(error);

})
