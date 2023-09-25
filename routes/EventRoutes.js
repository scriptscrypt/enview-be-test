const express = require("express");
const router = express.Router();
const genId = require("../utils/fnGenerateId");
const Event = require("../models/EventModel");

// Route to post a new event
router.post("/", async (req, res) => {

  try {
    const {
      event_id,
    //   timestamp,
      is_driving_safe,
      vehicle_id,
      location_type,

    } = req.body;

    const autoEventId = genId("event", 8);
    // const autoVehicle = genId("vehicle", 16);

    const event = new Event({ 
      event_id: autoEventId,  
    //   timestamp,
      is_driving_safe,
      vehicle_id,
      location_type,
    });

    await event.save();

    res.status(200).json({ message: "Event updated successfully", eventId : autoEventId });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to get all alerts till date for a specific location type

router.get("/all/:locationType", async (req, res) => {
  const { locationType } = req.params;
  try {
    const getAllDetials = await Event.find({location_type: locationType});
    console.log(getAllDetials);

    res.status(200).json({ message: "All Alerts Fetched successfully", Details : getAllDetials });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
