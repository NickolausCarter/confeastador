const { User, Reservation, Restaurant } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate({
            path: 'reservations',
            populate: {path: 'restaurant'}
          });

        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },
    reservations: async (parent, { username }) => {
      const params = username ? { username } : {};
       return Reservation.find(params).sort({ createdAt: -1 }).populate("restaurant");
    },
    reservation: async (parent, { _id }) => {
      return (await Reservation.findById({ _id }).populate("restaurant"));
    },
    // get all users
    users: async () => {
      return User.find().select("-__v -password").populate({
        path: 'reservations',
        populate: {path: 'restaurant'}
      });
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate({
          path: 'reservations',
          populate: {path: 'restaurant'}
        });
    },
    // get all users
    restaurants: async (parent, args, context) => {
      return Restaurant.find (args)
    },
    // get a restaurant by id
    restaurant: async (parent, { _id }) => {
      return Restaurant.findOne({ _id });
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addRestaurant: async (parent, args) => {
      const restaurant = await Restaurant.create(args);
      return restaurant
    },
    addReservation: async (parent, args, context) => {
      if (context.user) {
        const reservation = await Reservation.create({
          ...args,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { reservations: reservation} },
          { new: true }
        );

        return reservation;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    updateReservation: async (parent, {_id, reservationDate}, context) => {
      if (context.user) {
        const updatedReservation = await Reservation.findByIdAndUpdate({_id: _id}, {reservationDate: reservationDate}, {new: true});
        return updatedReservation
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    removeReservation: async (parent, {_id}, context) => {
      if (context.user) {
        const updatedReservation = await Reservation.findOneAndDelete({ _id});

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { reservations: _id } }
        );

        return updatedReservation;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    removeRestaurant: async (parent, {_id}, context) => {
   
        const updatedRestaurant = await Restaurant.findOneAndDelete({ _id});

        return updatedRestaurant;
      
    }
  },
};

module.exports = resolvers;
