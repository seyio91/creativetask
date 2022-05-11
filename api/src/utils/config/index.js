require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 8080,
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost/chattest",
    NODE_ENV: process.env.NODE_ENV || 'development',
    ROUNDS: process.env.ROUNDS || 10,
    DB_ENGINE: process.env.DB_ENGINE || 'mongodb'
  };