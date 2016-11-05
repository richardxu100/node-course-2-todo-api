const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true, // can't have two users with the same e-mail
    validate: {
      validator: validator.isEmail, // just validate with the isEmail function
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject(); // mongoose method, turns constructor into an Object

  return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({ access, token });

  // need to return in order to chain on a promise, we're returning a value, not a promise, though still perfectly legal
  return user.save().then(() => {
    return token; // success call
  });
}

// these turn into model methods, model is the this variable
UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch(e) {
    return Promise.reject();
    // new Promise((resolve, reject) => {
    //   reject();
    // });
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token, // quotes are only required with . in the name
    'tokens.access': 'auth'
  });
}

// need to use function as the callback, b/c of how arrow function binds this
UserSchema.pre('save', function(next) {
  var user = this;

  // user.isModified('password', )
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

var User = mongoose.model('User', UserSchema);

module.exports = { User }
