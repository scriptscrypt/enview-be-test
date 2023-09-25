const express = require("express");
const Event = require("../models/EventModel");
const Alert = require("../models/AlertsModal");

const router = express.Router();

router.get("/:alertId", async (req, res) => {
  const { alertId } = req.params;

  // const {

  //   } = req.body;

  try {
    const getAlertDetials = await Alert.findOne({ alert_id: alertId });
    console.log(getAlertDetials);

    res.status(200).json({ message: "Alert Fetched successfully", Details : getAlertDetials });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



module.exports = router;
