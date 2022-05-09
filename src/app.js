const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const logger = require("./utils/logger");
const { PORT, NODE_ENV } = require("./utils/config");

require('./connection')()

// mongoose
//   .connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => logger.info("Connected to Mongo"))
//   .catch((err) => logger.info(err));

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);

if (NODE_ENV === "development") {
  app.use(morgan("tiny"));
  logger.info("Enabling Morgan Logger");
}

const foods = [
  { id: 1, description: "burritos" },
  { id: 2, description: "quesadillas" },
  { id: 3, description: "churos" },
];

app.get("/foods", (req, res) => {
  res.json(foods);
});

app.listen(PORT, () => {
  logger.info(`App running on port ${PORT}`);
});
