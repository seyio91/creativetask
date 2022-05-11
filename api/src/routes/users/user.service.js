const { User } = require('../../models/index');

/**
 * Stores a new product into the database.
 * @param {Object} User user object to create.
 * @returns {Object} when user is saved provided.
 */
const createUser = async (userInfo) => {
  const user = new User(userInfo);
  await user.save();
  return user
};

/**
 * Searches for a User in the database.
 * @param {string} Email user email to search.
 * @returns {Object} when user with email is found.
 */
const findUser = (email) => User.findOne({ email }).exec();

/**
 * Returns all Users saved in the database.
 * @returns {List} User all Users in the database.
 */
const allUsers = () => User.find().exec()

/**
 * Searches for a User in the database.
 * @param {List} User Users to add to database.
 */
const insertMany = (users) => User.insertMany(users);

module.exports = { createUser, findUser, allUsers, insertMany };