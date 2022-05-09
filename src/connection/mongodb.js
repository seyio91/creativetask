const mongoose = require("mongoose");
const { MONGO_URI } = require("../utils/config");
const logger = require("../utils/logger");

const dbconnection = () => {
  return mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => logger.info("Connected to Mongo"))
    .catch((err) => {
      logger.error(err)
      process.exit(1)
    });
};

module.exports = dbconnection;