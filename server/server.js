require('./config/config.js');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

// GET /todos/123kasdf
app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id // only return todos that the logged in user created
  }).then((todos) => {
    res.send({ todos }) // sending objects allows us to be more flexible in the future, arrays not that flexible
  }, (err) => {
    res.status(400).send(err);
  });
});

// GET /todos/1234324
app.get('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOne({
    _id: id,
    _creator: req.user._id // the creator is the person currently logged in
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({ todo }); // more flexibility as an object
  }).catch((err) => {
    res.status(400).send();
  });
});

app.delete('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((err) => {
    res.status(400).send();
  });
});

// 500 error, make sure u put in the authenticate middleware
app.patch('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  // user can only update a few properties
  var body = _.pick(req.body, ['text', 'completed']); // only two properties a user can update

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null; // remove the value from the database
  }

  // new is like the returnOriginal property set to false
  // findOneAndUpdate
  Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
  }, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({ todo });
  }).catch((err) => {
    res.status(400).send()
  });
});

// POST /users, use pick
app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken(); // because we're chaining a promise
    // res.send({ user });
  }).then((token) => {
    // x- is a custom header, for specific purposes
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user)
});

app.post('/users/login', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((err) => {
    res.status(400).send();
  })
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }).catch(() => {
    res.status(400).send()
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = { app }
