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
};

var show = function(req, res, next){
  User.findById(req.params.id, function(error, user){
    if (error) res.json({message: 'Could not find user because ' + error});
    res.send({user: user});
  });
};

var updateRecord = function (req, res, next) {
  User.findById(req.params.id, function(error, user) {
    if(error) console.log(error);
    user.records = user.records.filter(function(record) {
      return record._id != req.params.record_id
    });
    user.records.push(req.body.record);
    user.save(function (error, user) {
      if(error) res.json({message: 'Could not find user because ' + error});
      res.json(user);
    });
  });
};

var getAllRecords = function(req, res, next) {
  User.find({}, function(error, users) {
    if(error) console.log(error);
    var records = [];
    users.forEach(function(user) {
      user.records.forEach(function(record) {
        records.push(record)
      });
    });
    res.json(records);
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
};

var destroyRecord = function(req, res, next) {
  User.findById(req.params.id, function(error, user) {
    if(error) console.log(error);
    user.records = user.records.filter(function(record) {
      return record._id != req.params.record_id
    });
    user.save(function (error, user) {
      if(error) res.json({message: 'Could not find user because ' + error});
      res.json(user);
    });
  });
};

module.exports = {
  index:         index,
  create:        create,
  show:          show,
  addRecord:     addRecord,
  getAllRecords: getAllRecords,
  updateRecord:  updateRecord,
  destroyRecord: destroyRecord
};
