const { User } = require('../../models/index');

const createUser = async (userInfo) => {
  const user = new User(userInfo);
  await user.save();
  return user
};

const findUser = (email) => User.findOne({ email }).exec();

const allUsers = () => User.find().exec()

const insertMany = (users) => User.insertMany(users);

module.exports = { createUser, findUser, allUsers, insertMany };