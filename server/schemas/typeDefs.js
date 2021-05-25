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
  restaurant: Restaurant
  createdAt: String
  reservationDate: String
  username: String
}

type Restaurant {
  _id: ID
  restaurantName: String
  cuisine: String
  zipcode: String
}

type Query {
  me: User
  users: [User]
  user(username: String!): User
  reservations(username: String): [Reservation]
  reservation(_id: ID!): Reservation
  restaurants: [Restaurant]
  restaurant(_id: ID!): Restaurant
}

type Auth {
  token: ID!
  user: User
}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  addReservation(restaurant: String!, createdAt: String!, reservationDate: String!, username: String!): Reservation
  removeReservation(_id: ID!): Reservation
}
`;

// export the typeDefs
module.exports = typeDefs;