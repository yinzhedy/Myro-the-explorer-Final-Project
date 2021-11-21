const mongoose = require('mongoose');
const { getMaxListeners } = require('npmlog');
const db = require('../models/users');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/shadowChaser', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const userSeed = [
    {
        password: 'myfirstpassword', 
        email: 'myemail@email.com',
        userName: 'myusername'
      },
      {
        password: 'myfirstpassword2', 
        email: 'myemail2@email.com',
        userName: 'myusername2'
      },
      {
        password: 'myfirstpassword3', 
        email: 'myemail3@email.com',
        userName: 'myusername3'
      },
      {
        password: 'myfirstpassword4', 
        email: 'myemail4@email.com',
        userName: 'myusername4'
      },
  
];

db.deleteMany({})
  .then(() => db.collection.insertMany(userSeed))
  .then((data) => {
    console.log(data.result.n + ' users inserted!');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
