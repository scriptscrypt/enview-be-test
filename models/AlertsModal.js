const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({

  alert_id: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
  is_overspeeding: {
    type: Boolean,
    default: true,
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
const Alert = mongoose.model('collAlerts', alertSchema);

module.exports = Alert;