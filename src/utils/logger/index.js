const prodLogger = require("./prodLogger");

let logger = null;

if (process.env.NODE_ENV === "production") {
  logger = prodLogger();
} else {
  // Seperate Loggers can be configured for different environments
  logger = prodLogger();
}

module.exports = logger;
