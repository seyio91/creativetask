const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const logger = require("./utils/logger");

mongoose
  .connect("mongodb://localhost/chattest", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger("Connected to Mongo"))
  .catch((err) => logger("cannot connect to mongo"));

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  appDebugger("Enabling Morgan Logger");
}

const foods = [
  { id: 1, description: "burritos" },
  { id: 2, description: "quesadillas" },
  { id: 3, description: "churos" },
];

app.get("/foods", (req, res) => {
  res.json(foods);
});

app.listen(3001, () => {
  logger("App running on localhost:3001");
});
