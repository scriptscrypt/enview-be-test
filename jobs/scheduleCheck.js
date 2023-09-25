// Check if an alert should be generated based on the rule
// If an alert should be generated, generate and save an alert in the DB

const mongoose = require("mongoose");
const Event = require("../models/EventModel"); 
const Alert = require("../models/AlertsModal"); 

const genId = require("../utils/fnGenerateId");

// Function to evaluate the rule and generate an alert
async function evaluateRuleAndGenerateAlert() {
  try {
    // Calculate the timestamp 5 minutes ago
    // const fiveMinutesAgo = new Date(Date.now() - 1 * 60 * 1000);
    const fiveMinutesAgo = new Date(Date.now() - 1 * 60 * 1000);

    // Retrieve events from the past 5 minutes where is_driving_safe is false
    const recentEvents = await Event.find({
      timestamp: { $gte: fiveMinutesAgo },
      is_driving_safe: false,
    });

    console.log("Recent Events with Non Safe Drivings", recentEvents);

    // Group events by location_type and count unsafe events
    const eventCounts = recentEvents.reduce((counts, event) => {
      counts[event.location_type] = (counts[event.location_type] || 0) + 1;
      return counts;
    }, {});

    console.log("Recent Event Counts", eventCounts);

    // Define the threshold values based on location_type
    const thresholdValues = {
      highway: 4,
      city_center: 3,
      commercial: 2,
      residential: 1,
    };

    // Check if an alert should be generated for each location_type
    for (const locationType in eventCounts) {
      const eventCount = eventCounts[locationType];
      const threshold = thresholdValues[locationType];

      if (eventCount >= threshold) {
        // Check if an alert has been generated in the past few minutes
        const lastAlert = await Alert.findOne({
          location_type: locationType,
          timestamp: { $gte: fiveMinutesAgo },
        });

        if (!lastAlert) {

          const autoAlertId = genId("alert", 12);

          // Generate and save an alert
          const alert = new Alert({
            alert_id: autoAlertId,
            vehicle_id : recentEvents[0].vehicle_id,
            location_type: locationType,
            timestamp: new Date(),
          });

          await alert.save();
          console.log(`Alert generated for ${locationType} & saved to DB`);
        }
      }
    }
  } catch (error) {
    console.error("Error evaluating rule and generating alert:", error);
  }
}

// Schedule the function to run at regular intervals (e.g., every minute)
// setInterval(evaluateRuleAndGenerateAlert, 5 * 60 * 1000); 
setInterval(evaluateRuleAndGenerateAlert, 1 * 60 * 1000); 
