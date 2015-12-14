var _ = require('lodash');

var localEnvVars = {
  TITLE:      'grooves-app',
  SAFE_TITLE: 'grooves-app'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
