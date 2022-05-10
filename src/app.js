const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const logger = require("./utils/logger");
const { PORT, NODE_ENV } = require("./utils/config");
const { userRouter } = require("./routes");

/**
 * DB Connection Configuration.
 */
require('./connection')()

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);

/**
 * Enable Endpoint Logging for Development Environment.
 */
if (NODE_ENV === "development") {
  app.use(morgan("tiny"));
  logger.info("Enabling Morgan Logger");
}

/**
 * Express Routes.
 */
app.use("/api/", userRouter);


app.all('*', (req, res) => res.status(404).json({
    error: 'Sorry, Page not found'
}))

/**
 * StartUp Command.
 */
app.listen(PORT, () => {
  logger.info(`App running on port ${PORT}`);
});
