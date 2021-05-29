const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const Restaurant = require('./Restaurant');

const reservationSchema = new Schema(
  {
    restaurant: {
      type: Schema.Types.ObjectId
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    reservationDate: {
      type: Date,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// thoughtSchema.virtual('reactionCount').get(function() {
//   return this.reactions.length;
// });

const Reservation = model('Reservation', reservationSchema);

module.exports = Reservation;
