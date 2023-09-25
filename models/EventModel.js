const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({

  event_id: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
  is_driving_safe: {
    type: Boolean,
    required: true,
  }, 
  vehicle_id:{
    type: String,
    required: true,
  },
  location_type:{
    type: String,
    required: true,
  },
//   updatedAt:{
//     type: Date,
//     required: true,
//   }
})

// Create the User model
const Event = mongoose.model('collEvents', eventSchema);

module.exports = Event;