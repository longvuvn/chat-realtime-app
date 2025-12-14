const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const URL = process.env.MONGODB_URL;
async function Connect() {
  try {
    await mongoose.connect(URL);
    console.log("Connected to MongoDB");
    return mongoose;
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

module.exports = Connect;
