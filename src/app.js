const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const {PORT, MONGO_URI, NODE_ENV} = require('./utils/config')

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger("Connected to Mongo"))
  .catch((err) => logger(err));

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
  logger("Enabling Morgan Logger");
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
  logger(`App running on port ${port}`);
});
