const { Schema, model } = require('mongoose');

const restaurantSchema = new Schema(
  {
    restaurantName: {
      type: String,
      required: 'You need to specify a restaurant!',
      minlength: 1
    },
    cuisine: {
      type: String
    },
    zipcode: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 5
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

// thoughtSchema.virtual('reactionCount').get(function() {
//   return this.reactions.length;
// });

const Restaurant = model('Restaurant', restaurantSchema);

module.exports = Restaurant;
