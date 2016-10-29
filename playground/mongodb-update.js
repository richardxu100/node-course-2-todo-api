const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    // console.log('Connected...') would run if we don't put a return statement. Return statement automatically exits out of a function. Could also use if, else syntax
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server')

  // findOneAndUpdate
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5815233e1be67d65c249b357')
  // }, {
  //   $set: { // need to use update operator
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5815252c6425280c5e19d2b6')
  }, {
    $inc: {
      age: 2
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result)
  });

  // db.close();
});
