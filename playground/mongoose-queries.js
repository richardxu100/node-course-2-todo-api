const { ObjectID } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

// var id = '581612596657a608d577ff4411';
//
// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }

// Todo.find({ // returns an array
//   _id: id // Mongoose automatically converts string into ObjectID
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo)
// });

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo by Id', todo);
// }).catch((err) => console.log(err));

// User.findById()
var id = '58154c7db70ec713ecab54d7';
User.findById(id).then((user) => {
  if (!user) {
    return console.log('ID not found');
  }
  console.log('User by ID', user);
}).catch((err) => console.log(err));
