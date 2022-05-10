const mongoose = require("mongoose");

const dbHandler = require("./db-handler");
const userService = require("../src/routes/users/user.service");
const { User } = require("../src/models");
const hashPassword = require("../src/utils/password");

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await dbHandler.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());

/**
 * Users test suite.
 */
describe("user", () => {
  /**
   * Tests that a valid User can be created through the userService without throwing any errors.
   */
  it("can be created correctly", async () => {
    expect(
      async () => await userService.createUser(userComplete)
    ).not.toThrow();
  });

  /**
   * User should exist after being created.
   */
  it("exists after being created", async () => {
    await userService.createUser(userComplete);

    const createdUser = await User.findOne();

    expect(createdUser.email).toBe(userComplete.email);
  });

  /**
   * Should throw an error when User doesn't have an email and password.
   */
  it("requires email address and password", async () => {
    await expect(userService.createUser(userMissingEmail)).rejects.toThrow(
      mongoose.Error.ValidationError
    );
    await expect(userService.createUser(userMissingPassword)).rejects.toThrow(
      mongoose.Error.ValidationError
    );
  });

  /**
   * Ensure all fields are inserted
   */
  it("Ensure all fields are inserted", async () => {
    await userService.insertMany(multiUsers);
    const createdUsers = await userService.allUsers();
    expect(createdUsers.length).toBe(multiUsers.length);
  });

  /**
   * Can Return Single User.
   */
   it("can Create Multiple Fields", async () => {
    await userService.insertMany(multiUsers);
    const returnedUser = await userService.findUser(multiUsers[1]['email'])
    expect(returnedUser.email).toBe(multiUsers[1].email)
  });
});

/**
 * Complete User example.
 */
const userComplete = {
  first_name: "Adamu",
  last_name: "Viktor",
  email: "adamsvic@example.com",
  password: hashPassword("adBmuci@nbasd1"),
};

/**
 * User with Missing Email.
 */
const userMissingEmail = {
  first_name: "Adamu",
  last_name: "Viktor",
  password: hashPassword("adBmuci@nbasd1"),
};

/**
 * User with Missing Password.
 */
const userMissingPassword = {
  first_name: "Adamu",
  last_name: "Viktor",
  email: "adamsvic@example.com",
};

/**
 * Multi User List.
 */
const multiUsers = [
  {
    first_name: "Admin",
    last_name: "Admin",
    email: "admin@example.com",
    password: hashPassword("password"),
  },
  {
    first_name: "James",
    last_name: "Bondss",
    email: "jammy@example.com",
    password: hashPassword("password"),
  },
  {
    first_name: "Samuel",
    last_name: "Binuetan",
    email: "samubins@example.com",
    password: hashPassword("password"),
  },
];
