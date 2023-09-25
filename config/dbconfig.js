const mongoose = require('mongoose');

// Function to connect to the database
async function connectDB() {
  try {
    // Please use your local/remote MongoDB URI to connect below in case
    // you wish to test the application with your own database

    // The Below mentioned DB URL is Public Network Accessible
    await mongoose.connect("mongodb+srv://tapDBUser:TapDBUserPwd@clustertapdb.sycodi5.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database!');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

module.exports = connectDB;