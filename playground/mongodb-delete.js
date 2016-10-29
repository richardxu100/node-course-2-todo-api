const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    // console.log('Connected...') would run if we don't put a return statement. Return statement automatically exits out of a function. Could also use if, else syntax
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server')

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  // deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  // findOneAndDelete, returns the item deleted
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  // Task!
  // db.collection('Users').deleteMany({name: 'Rich'}).then((res) => {
  //   console.log(res);
  // });

  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('581519795f925707a07535b6')
  }).then((res) => {
    console.log(JSON.stringify(res, undefined, 2));
  });

  // db.close();
});
