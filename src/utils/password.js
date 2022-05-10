/* eslint-disable max-len */
const bcrypt = require("bcryptjs");
const config = require("../utils/config");
const rounds = Number(config.ROUNDS);

/**
 * Hash Password Method
 * @param {string} password
 * @returns {string} returns hashed password
 */
const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(rounds));

module.exports = hashPassword;
