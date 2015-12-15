var express = require('express'),
    router  = new express.Router();

// Require controllers.
var welcomeController = require('../controllers/welcome');
var usersController   = require('../controllers/users');

// root path:
// app.get('/', welcomeController.index);
router.get('/users',     usersController.index);

// users resource paths:
router.get('/users/:id', usersController.show);
router.put('users/:id',  usersController.update);
router.delete('users/:id', usersController.destroy);


module.exports = router;
