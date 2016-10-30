const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

// GET /todos/123kasdf
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({ todos }) // sending objects allows us to be more flexible in the future, arrays not that flexible
  }, (err) => {
    res.status(400).send(err);
  });
});

// GET /todos/1234324
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({ todo }); // more flexibility as an object
  }).catch((err) => {
    res.status(400).send();
  });
  
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = { app }
