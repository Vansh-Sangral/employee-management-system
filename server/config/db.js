const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.warn('No MONGODB_URI configured. Falling back to in-memory employee storage.');
      return false;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 2000 });
    console.log(`MongoDB connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`MongoDB connection unavailable: ${error.message}`);
    return false;
  }
};

module.exports = connectDB;
