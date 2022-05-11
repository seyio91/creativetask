const mongoose = require("mongoose");

/**
 * User model schema.
 */
const user = {
  first_name: String,
  last_name: String,
  email: { type: String, unique: true, required: true, dropDups: true },
  password: { type: String, select: false, required: true },
  created_at: { type: Date, default: Date.now },
  conversations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
  ],
};

const userSchema = new mongoose.Schema(user);

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
