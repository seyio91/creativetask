const UserService = require("./user.service");
const hashPassword = require("../../utils/password");

// const
const createUser = async (req, res) => {
  try {
    // Schema Verification can be added
    const { email, password } = req.body;
    const isExisting = await UserService.findUser(email);
    if (isExisting)
      return res.status(400).json({ error: "User Already Exists" });
    req.body.password = hashPassword(password);
    const user = await UserService.createUser(req.body);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const singleUser = async (req, res) => {
  // change to params
  const result = await UserService.findUser(req.body.email);
  return res.status(200).json({ result });
};

// returns all users
const allUsers = async (req, res) => {
  const result = await UserService.allUsers();
  return res.status(200).json({ result });
};

const health = (req, res) => {
  res.status(200).json({ success: "Ok" });
};

module.exports = {
  createUser,
  singleUser,
  allUsers,
  health,
};
