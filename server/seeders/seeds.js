const faker = require("faker");
const mongoose = require("mongoose");
const db = require("../config/connection");
const { User, Reservation, Restaurant } = require("../models");
const dateFormat = require("../utils/dateFormat");

db.once("open", async () => {
  await User.deleteMany({});
  await Reservation.deleteMany({});
  await Restaurant.deleteMany({});

  //=========================================================
  // create user data
  //=========================================================
  const userData = [];
  userData.push({
    _id: mongoose.Types.ObjectId("60b0739f54794b7fcf03829e"),
    username: "John_Smith",
    email: "jsmith@gmail.com",
    password: `$2b$10$v4dlqHhk8IDYmBr7D4zdjuTKDFgjhcjRQ4lkjQYzACabRGtkD.3bO`,
  });
  userData.push({
      _id: mongoose.Types.ObjectId("60b0739f54794b7fcf03829f"),
      username: "natalia",
      email: "natalia@gmail.com",
      password: `$2b$10$v4dlqHhk8IDYmBr7D4zdjuTKDFgjhcjRQ4lkjQYzACabRGtkD.3bO`,
    });
  for (let i = 0; i < 2; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = `$2b$10$v4dlqHhk8IDYmBr7D4zdjuTKDFgjhcjRQ4lkjQYzACabRGtkD.3bO`; //faker.internet.password();

    userData.push({ username, email, password });
  }

  //console.log(userData);
  const createdUsers = await User.collection.insertMany(userData);
  console.log(createdUsers);

  //=========================================================
  // Restaurant data
  //=========================================================
  const restaurantData = [];
  restaurantData.push({
    restaurantName: "Dans",
    cuisine: "Burger and fries",
    zipcode: "78723",
    seats: 6,
  });
  restaurantData.push({
    restaurantName: "Carolines",
    cuisine: "Beef Steak Ragu",
    zipcode: "78720",
    seats: 8,
  });
  restaurantData.push({
    restaurantName: "Razoos",
    cuisine: "Crawfish Etoufee",
    zipcode: "78660",
    seats: 4,
  });

  //console.log(resturantData);
  const createdRestaurants = await Restaurant.collection.insertMany(
    restaurantData
  );
  console.log(createdRestaurants);

  //=========================================================
  // Reservation data
  //=========================================================
  const reservationData = [
    {
      restaurant: createdRestaurants.ops[0],
      reservationDate: "05/31/2021",
      username: createdUsers.ops[0].username,
    },
    {
      restaurant: createdRestaurants.ops[1],
      reservationDate: "06/01/2021",
      username: createdUsers.ops[1].username,
    },
  ];
  //console.log(reservationData);
  const createdReservations = await Reservation.collection.insertMany(
    reservationData
  );
  console.log(createdReservations);

  console.log("all done!!");
  process.exit(0);
});
