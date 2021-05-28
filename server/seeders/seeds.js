const faker = require('faker');
const mongoose = require('mongoose')
const db = require('../config/connection');
const { User, Reservation, Restaurant} = require('../models');
const dateFormat = require('../utils/dateFormat');

db.once('open', async () => {

  await User.deleteMany({});
  await Reservation.deleteMany({});
  await Restaurant.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);



const resturantData = [{
  resturantName: 'Dans',
  cuisine: 'Burger and fries',
  zipcode: '78723',
  seats: 4
},
{
  resturantName: 'Carolines',
  cuisine: 'Beef Steak Ragu',
  zipcode: '78720',
  seats: 2
},
{
  resturantName: 'Razoos',
  cuisine: 'Crawfish Etoufee',
  zipcode: '78660',
  seats: 6
}
]
 
 
  await Restaurant.collection.insertMany(resturantData);
   


  const reservationData = [{
    restaurant:  mongoose.Types.ObjectId( "60b0739f54794b7fcf03829e"),
    reservationDate: dateFormat ('05/31/2021'),
    userName: 'Murray_McClure'
  }]
 
  await Reservation.collection.insertMany(resturantData);

  // create friends
  // for (let i = 0; i < 100; i += 1) {
  //   const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
  //   const { _id: userId } = createdUsers.ops[randomUserIndex];

  //   let friendId = userId;

  //   while (friendId === userId) {
  //     const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
  //     friendId = createdUsers.ops[randomUserIndex];
  //   }

  //   await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
  // }

  // // create thoughts
  // let createdThoughts = [];
  // for (let i = 0; i < 100; i += 1) {
  //   const thoughtText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

  //   const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
  //   const { username, _id: userId } = createdUsers.ops[randomUserIndex];

  //   const createdThought = await Thought.create({ thoughtText, username });

  //   const updatedUser = await User.updateOne(
  //     { _id: userId },
  //     { $push: { thoughts: createdThought._id } }
  //   );

  //   createdThoughts.push(createdThought);
  // }

  // // create reactions
  // for (let i = 0; i < 100; i += 1) {
  //   const reactionBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

  //   const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
  //   const { username } = createdUsers.ops[randomUserIndex];

  //   const randomThoughtIndex = Math.floor(Math.random() * createdThoughts.length);
  //   const { _id: thoughtId } = createdThoughts[randomThoughtIndex];

  //   await Thought.updateOne(
  //     { _id: thoughtId },
  //     { $push: { reactions: { reactionBody, username } } },
  //     { runValidators: true }
  //   );
  // }

  console.log('all done!');
  process.exit(0);
});
