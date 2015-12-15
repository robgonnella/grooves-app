// Require resource's model(s).
var User = require("../models/user");

var index = function(req, res, next){
  User.find({}, function(error, users){
    res.json(users);
  });
};

var create = function (req, res, next) {
  User.create({
    email:    req.body.email,
    password: req.body.password
  }).then(function(newUser) {
    res.json({
      success: true,
      message: 'Successfully created user.',
      data: {
        email: newUser.email,
        id:    newUser._id
      }
    });
  }).catch(function(err) {
    next(err);
  });
}


var show = function(req, res, next){
  User.findById(req.params.id, function(error, user){
    if (error) res.json({message: 'Could not find user because ' + error});
    res.render('users/show', {user: user});
  });
};

var update = function(req, res, next) {

}

var destroy = function(req, res, next) {

};

module.exports = {
  index: index,
  show:  show,
  update: update,
  destroy: destroy
};
