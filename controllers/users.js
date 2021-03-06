// Require resource's model(s).
var User = require("../models/user");
var images = [
  "./assets/1.png",
  "./assets/2.png",
  "./assets/3.png",
  "./assets/4.png",
  "./assets/5.png",
  "./assets/6.png",
  "./assets/7.png",
  "./assets/8.jpg",
  "./assets/9.jpg",
  "./assets/10.png",
  "./assets/11.png",
  "./assets/12.jpg",
  "./assets/13.jpg",
  "./assets/14.jpg"
];

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
      message: 'Successfully created user. You may now login!',
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


var addRecord = function(req, res, next) {
  User.findById(req.params.id, function(error, user) {
    if(error) res.json({message: 'Could not add record because ' + error});
    req.body.record.current_image = images[Math.floor(Math.random() * (14 - 0)) + 0];
    user.records.push(req.body.record);
    user.save(function (error, user) {
      if(error) res.json({message: 'Could not add record because ' + error});
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

var updateRecord = function (req, res, next) {

  User.findById(req.params.id, function(error, user) {
    if(error) console.log(error);
    user.records.forEach(function(record) {
      if ( record._id == req.params.record_id ) {
        if (record.artist !== req.body.record.artist) {
          record.artist = req.body.record.artist;
        } else if (record.album !== req.body.record.album){
            record.album = req.body.record.album;
        } else if (record.year !== req.body.record.year){
            record.year = req.body.record.year;
        } else if (record.label !== req.body.record.label) {
            record.label = req.body.record.label;
        } else if (record.price !== req.body.record.price) {
            record.price = req.body.record.price;
        } else if (record.description !== req.body.record.description) {
            record.description = req.body.record.description;
        }
        return record;
      }
    });
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

var uploadImage = function(req, res, next){
  User.findById(req.body.user._id, function(err, user){
    if ( err ) res.json({ message: 'Could not find user because ' + error });

    var recordUrl = req.body.image_url;
    var recordId = req.body.record._id;
    user.records.forEach(function(record){
      if ( record._id == recordId ){
        record.images.push(recordUrl);
        record.current_image = recordUrl;
        return;
      }
    });
    user.save(function(err, user){
      if ( err ) res.json({ message: "could not save record image because" + err });
      res.json(user);
    });
  });
}

module.exports = {
  index:         index,
  create:        create,
  show:          show,
  addRecord:     addRecord,
  getAllRecords: getAllRecords,
  updateRecord:  updateRecord,
  destroyRecord: destroyRecord,
  uploadImage:   uploadImage
};
