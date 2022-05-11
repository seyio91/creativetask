const { createLogger, format, transports } = require("winston");
const { combine, timestamp, json } = format;

const prodLogger = () => {
  return createLogger({
    level: "info",
    format: combine(timestamp(), json()),

    defaultMeta: { service: "user-service" },
    transports: [new transports.Console()],
  });
};

module.exports = prodLogger;
