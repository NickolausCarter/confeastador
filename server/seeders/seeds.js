const faker = require("faker");
const mongoose = require("mongoose");
const db = require("../config/connection");
const { User, Reservation, Restaurant } = require("../models");
const dateFormat = require("../utils/dateFormat");

db.once("open", async () => {
  await User.deleteMany({});
  await Reservation.deleteMany({});
  await Restaurant.deleteMany({});

  const reservationId1 = "60b58f8402e48e8605a9d156";
  const reservationId2 = "60b58f8402e48e8605a9d157";

  //=========================================================
  // create user data
  //=========================================================
  const userData = [];
  userData.push({
    username: "John_Smith",
    email: "jsmith@gmail.com",
    password: `$2b$10$v4dlqHhk8IDYmBr7D4zdjuTKDFgjhcjRQ4lkjQYzACabRGtkD.3bO`,
    reservations: [reservationId1]
  });
  userData.push({
      username: "Natalia",
      email: "natalia@gmail.com",
      password: `$2b$10$v4dlqHhk8IDYmBr7D4zdjuTKDFgjhcjRQ4lkjQYzACabRGtkD.3bO`,
      reservations: [reservationId2]
    });
  for (let i = 0; i < 3; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = `$2b$10$v4dlqHhk8IDYmBr7D4zdjuTKDFgjhcjRQ4lkjQYzACabRGtkD.3bO`; //faker.internet.password();

    userData.push({ username, email, password });
  }

  
  const createdUsers = await User.collection.insertMany(userData);
  

  //=========================================================
  // Restaurant data
  //=========================================================
  const restaurantData = [];

  
  const createdRestaurants = await Restaurant.collection.insertMany(
    restaurantData
  );
  

  //=========================================================
  // Reservation data
  //=========================================================
  const reservationData = [
    {
      _id: mongoose.Types.ObjectId(reservationId1),
      restaurant: [createdRestaurants.ops[0]._id],
      reservationDate: "Jun 05 2021 18:30:00 GMT-0500 (Central Daylight Time)",
      username: createdUsers.ops[0].username,
    },
    {
      _id: mongoose.Types.ObjectId(reservationId2),
      restaurant: [createdRestaurants.ops[1]._id],
      reservationDate: "Jun 05 2021 19:30:00 GMT-0500 (Central Daylight Time)",
      username: createdUsers.ops[1].username,
    },
  ];
  
  const createdReservations = await Reservation.collection.insertMany(
    reservationData
  );
  

  
  process.exit(0);
});
