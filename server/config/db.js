const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // We use 127.0.0.1 because 'localhost' can be buggy on Windows Node.js
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/remixr');
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;