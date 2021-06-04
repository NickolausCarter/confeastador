// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`

type User {
  _id: ID
  username: String
  email: String
  reservations: [Reservation]
}

type Reservation {
  _id: ID
  restaurant: [Restaurant]
  createdAt: String
  reservationDate: String
  username: String
}

type Restaurant {
  _id: String
  restaurantName: String
  cuisine: String
  zipcode: String
}

input RestaurantFilters  {
  restaurantName: String
  ids: ID
  cuisine: String
  zipcode: String
}

type Auth {
  token: ID!
  user: User
}

type Query {
  me: User
  users: [User]
  user(username: String!): User
  reservations(username: String): [Reservation]
  reservation(_id: ID!): Reservation
  restaurants(restaurantName: String, cuisine: String, zipcode: String): [Restaurant]
  restaurant(_id: ID!): Restaurant
}


type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  addRestaurant(restaurantName: String!, cuisine: String!, zipcode: String!): Restaurant
  addReservation(restaurant: ID!, reservationDate: String!): Reservation
  updateReservation(_id: ID!, reservationDate: String!): Reservation
  removeReservation(_id: ID!): Reservation
  removeRestaurant(_id: ID!): Restaurant
}
`;

// export the typeDefs
module.exports = typeDefs;