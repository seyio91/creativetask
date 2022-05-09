require("dotenv").config();

module.exports = {
    PORT: process.env.PORT,
    MONGO_URI: `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`,
    NODE_ENV: process.env.NODE_ENV
  };