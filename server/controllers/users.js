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
    password: req.body.password,
    records:  req.body.records
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

var update = function (req, res, next) {

};

var show = function(req, res, next){
  User.findById(req.params.id, function(error, user){
    if (error) res.json({message: 'Could not find user because ' + error});
    res.json(user);
  });
};

var addRecord = function(req, res, next) {
  User.findById(req.params.id, function(error, user) {
    if(error) res.json({message: 'Could not find user because ' + error});
    user.records.push(req.body.record);
    user.save(function (error, user) {
      if(error) res.json({message: 'Could not find user because ' + error});
      res.json(user);
    });
  });
}

var destroy = function(req, res, next) {

};

module.exports = {
  index: index,
  update: update,
  create: create,
  show:  show,
  addRecord: addRecord,
  destroy: destroy
};
