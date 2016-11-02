var mongoose = require('mongoose');

// telling mongoose we want to use the built-in promise, not callback
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = {
  mongoose
}
