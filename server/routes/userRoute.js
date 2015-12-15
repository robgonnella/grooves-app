var moment = require('moment'),
    User   = require('../models/user'),
    usersController = require('../controllers/users');

// In order to simplify our process, we will handle the request
// inline here, instead of passing to controller files.
module.exports = function(app, errorHandler) {

  app.get('/api/users', usersController.index);
  // app.put('/api/users/:id' usersController.update);
  app.post('/api/users',

    // validations
    checkUserFields,
    checkPassword,
    checkUserExists,

    // create new user
    function (req, res, next) {
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
  });


  // *** VALIDATIONS ***

  function checkUserFields(req, res, next) {
    if (
      !req.body.email    ||
      !req.body.password
    ) {
      errorHandler(
        422,
        'Missing required field: one of email, name, password, or dob.',
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
