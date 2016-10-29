const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    // console.log('Connected...') would run if we don't put a return statement. Return statement automatically exits out of a function. Could also use if, else syntax
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server')

  // returns a promise (find() just returns a cursor)

  // db.collection('Todos').find({
  //   _id: new ObjectID('58151a961be67d65c249b34f')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err)
  // });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch todos', err)
  // });

  db.collection('Users').find({name: 'Rich'}).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch users', err);
  });

  // db.close();
});
