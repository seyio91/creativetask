require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 3001,
    // MONGO_URI: `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}` || "mongodb://localhost/chattest",
    MONGO_URI: "mongodb://localhost/chattest",
    NODE_ENV: process.env.NODE_ENV || 'development'
  };