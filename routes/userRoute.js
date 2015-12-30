var moment = require('moment'),
    User   = require('../models/user'),
    usersController = require('../controllers/users');

// In order to simplify our process, we will handle the request
// inline here, instead of passing to controller files.
module.exports = function(app, errorHandler) {

  app.get('/api/users', usersController.index);
  app.get('/api/users/:id', usersController.show);
  app.get('/api/users/:id/records', usersController.userRecords);
  app.get('/api/users/:id/records/:record_id', usersController.showRecord);
  app.get('/api/records', usersController.getAllRecords);
  app.post('/api/users/:id/records', usersController.addRecord);
  app.put('/api/users/:id/records/:record_id', usersController.updateRecord);
  app.delete('/api/users/:id/records/:record_id', usersController.destroyRecord);

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
