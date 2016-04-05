var moment = require('moment'),
    User   = require('../models/user'),
    usersController = require('../controllers/users');

var aws = require('aws-sdk');
var AWS_ACCESS_KEY=process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY=process.env.AWS_SECRET_KEY;
var S3_BUCKET=process.env.S3_BUCKET;
// In order to simplify our process, we will handle the request
// inline here, instead of passing to controller files.
module.exports = function(app, errorHandler) {

  app.get('/api/users', usersController.index);
  app.get('/api/users/:id', usersController.show);
  app.get('/api/records', usersController.getAllRecords);
  app.post('/api/users/:id/records', usersController.addRecord);
  app.put('/api/users/:id/records/:record_id', usersController.updateRecord);
  app.delete('/api/users/:id/records/:record_id', usersController.destroyRecord);


  app.get('/upload', function(req, res){
      aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
      var s3 = new aws.S3();
      var s3_params = {
          Bucket: S3_BUCKET,
          Key: req.query.file_name,
          ContentType: req.query.file_type,
          ACL: 'public-read-write'
      };
      s3.putObject(s3_params, function(err, url){
          if(err){
              console.log(err);
          }
          else{
            var return_data = {
                signed_request: url,
                image_url: 'https://s3-us-west-1.amazonaws.com/'+S3_BUCKET+"/"+req.query.file_name
            }
            return res.json(return_data);
            // res.end();
          }
      });
  });

  app.put('/submit', usersController.uploadImage);



  app.post('/api/users',
    // validations
    checkUserFields,
    checkPassword,
    checkUserExists,
    usersController.create
  );

  // *** VALIDATIONS ***
  function checkUserFields(req, res, next) {
    if (
      !req.body.email    ||
      !req.body.password
    ) {
      errorHandler(
        422,
        'Missing required field: one of email or password',
        req, res
      );
    } else {
      next();
    }
  }

  function checkPassword(req, res, next) {
    if (req.body.password.length < 5) {
      errorHandler(
        422,
        'Password field must have minimum of 5 characters.',
        req, res
      );
    } else {
      next();
    }
  }


  function checkUserExists(req, res, next) {
    User.find({email: req.body.email}).exec()
      .catch(function(err) {
        next(err);
    }).then(function(users) {
        if (users.length > 0) {
          errorHandler(
            422,
            'User email already exists.',
            req, res
          );
        } else {
          next();
        }
    });
  }

};
