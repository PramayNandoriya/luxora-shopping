const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const mongo_url = process.env.MONGO_CONN;

mongoose
  .connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
