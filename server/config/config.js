var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  var config = require('./config.json');
  var envConfig = config[env]; // have to use bracket notation when using a variable to access a property

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}
