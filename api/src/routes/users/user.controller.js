const UserService = require("./user.service");
const hashPassword = require("../../utils/password");

/**
 * Endpoint to create a User.
 */
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

/**
 * Endpoint to get Single User by email.
 */
const singleUser = async (req, res) => {
  // change to params
  const result = await UserService.findUser(req.body.email);
  if (!result){
    return res.status(404).json({error: "User not Found"})
  }
  return res.status(200).json(result);
};

/**
 * Endpoint to return all Users.
 */
const allUsers = async (req, res) => {
  const result = await UserService.allUsers();
  return res.status(200).json({ result });
};

/**
 * Endpoint for Health Check.
 */
const health = (req, res) => {
  res.status(200).json({ success: "Ok" });
};

module.exports = {
  createUser,
  singleUser,
  allUsers,
  health,
};
