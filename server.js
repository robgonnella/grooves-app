var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var bodyParser   = require('body-parser');
var debug        = require('debug')('app:http');
var cookieParser = require('cookie-parser');
var locus        = require('locus');
require('dotenv').load();

// Load local libraries.
var env      = require('./config/environment');
    // mongoose = require('./config/database');

// Instantiate a server application.
var app = express();


// Configure the application (and set it's title!).
app.set('title', env.TITLE);
app.set('safe-title', env.SAFE_TITLE);
app.set('secret-key', env.SECRET_KEY);
// Create local variables for use thoughout the application.
app.locals.title = app.get('title');


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin',  '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Logging layer.
app.use(logger('dev'));

// Helper layer (parses the requests, and adds further data).
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser('notsosecretnowareyou'));

// Routing layers: favicon, static assets, dynamic routes, or 404…

// Routes to static assets. Uncomment below if you have a favicon.
app.use(express.static(path.join(__dirname, 'public')));

// Useful for debugging the state of requests.
app.use(debugReq);

// Defines all of our "dynamic" routes.
app.get('/api', function(req, res, next) {
  var baseUri = `${req.protocol}:\/\/${req.get('host')}\/api`;
  res.json({
    token_url: `${baseUri}/token`,
    user_urls: [
      `${baseUri}/users`,
      `${baseUri}/me`
    ]
  });
});


// Validation: check for correctly formed requests (content type).
app.use(['/api/users', '/api/token'], function(req, res, next) {
  if (req.get('Content-Type') !== 'application/json') {
    errorHandler(
      400,
      'Request body must be JSON. Set your headers; see ' +
      'http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.17',
      req, res
    );
  } else {
    next();
  }
});

// Parsing and validation (replies with good errors for JSON parsing).
app.use('/api', bodyParser.json());

// User resource route (POST /users)
require('./routes/userRoute')(app, errorHandler);

// Token resource route (POST /token)
require('./routes/tokenRoute')(app, errorHandler);

// Authorized resource route (GET /me)
require('./routes/meRoute')(app, errorHandler);


// Catches all 404 routes.
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error-handling layer.
app.use(function(err, req, res, next) {
  // In development, the error handler will print stacktrace.
  err = (app.get('env') === 'development') ? err : {};
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

function debugReq(req, res, next) {
  debug('params:', req.params);
  debug('query:',  req.query);
  debug('body:',   req.body);
  next();
}

function errorHandler(code, message, req, res) {
  var title = '';
  var responseJson = {};

  res.status(code);
  switch(code) {
    case 400: title = '400 Bad Request';  break;
    case 401: title = '401 Unauthorized'; break;
    case 403: title = '403 Forbidden';    break;
    case 404: title = '404 Not Found';    break;
    case 422: title = '422 Unprocessable Entity';
  }

  responseJson.response = title;
  if (message && message.length > 0) responseJson.message = message;

  res.json(responseJson);
}

module.exports = app;
