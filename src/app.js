const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const logger = require("./utils/logger");
const { PORT, NODE_ENV } = require("./utils/config");
const { userRouter } = require("./routes");
const promBundle = require("express-prom-bundle");

/**
 * DB Connection Configuration.
 */
require('./connection')()

/**
 * Add the options to the prometheus middleware
 */
const metricsMiddleware = promBundle({
  includeMethod: true, 
  includePath: true, 
  includeStatusCode: true, 
  includeUp: true,
  customLabels: {project_name: 'user_service', project_type: 'test_metrics_labels'},
  promClient: {
      collectDefaultMetrics: {
      }
    }
});

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
 * Add the prometheus middleware to all routes
 */
app.use(metricsMiddleware)

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
