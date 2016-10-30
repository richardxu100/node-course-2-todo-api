var mongoose = require('mongoose');

// telling mongoose we want to use the built-in promise, not callback
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {
  mongoose
}
