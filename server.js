const express = require("express");

const app = express();
const PORT = 3001;
const connectDB = require("./config/dbconfig");
const eventRoutes = require("./routes/EventRoutes");
const alertRoutes = require("./routes/AlertRoutes");

const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors middleware
require("dotenv").config();
const cron = require("node-cron");
const sendAlert = require("./jobs/scheduleCheck");

// Connect to the MongoDB database
connectDB();

app.get("/", (req, res) => {
  res.send("Found the Server!");
});

app.use(
  cors({
    origin: "*",
  })
);

// Body parser middleware
app.use(express.json());

// Parse incoming JSON request bodies
// app.use(bodyParser.json());

// Include the user routes
app.use("/event", eventRoutes);
app.use("/alert", alertRoutes);

// cron.schedule('* * * * *', () => {
cron.schedule("*/5 * * * * *", () => {
  sendAlert();
  console.log("Running a task every 5 seconds");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
