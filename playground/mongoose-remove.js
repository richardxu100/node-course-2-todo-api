const { ObjectID } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');


// Todo.remove({}), everything will be removed, only if an empty object is put in
// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove()
// Todo.findByIdAndRemove()
//
// Todo.findOneAndRemove({ _id: '581795fbc73ec4534f5025b3'}).then((todo) => {
//
// })

Todo.findByIdAndRemove('581795fbc73ec4534f5025b3').then((todo) => {
  console.log(todo);
});
