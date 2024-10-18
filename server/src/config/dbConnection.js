// config/dbConnection.js
const mongoose = require("mongoose");

async function connectToDatabase() {
  try {
    await mongoose.connect(String(process.env.MONGO_URL), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("🍀🍀🍀🍁🍁🍁🍂🍂Database connected successfully🍃🔰🔰🔰🌿🌿");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
}

module.exports = connectToDatabase;
