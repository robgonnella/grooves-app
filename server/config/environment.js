var _ = require('lodash');

var localEnvVars = {
  TITLE:      'grooves-app',
  SAFE_TITLE: 'grooves-app',
  SECRET_KEY: 'notsosecretanymoreisityounaughtything'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
