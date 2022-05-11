const mongoconnection = require("./mongodb");
const { DB_ENGINE } = require('../utils/config')

let dbconnection = null;

if (DB_ENGINE == "mongodb") {
    // Support for multiple DB engine connection
    dbconnection = mongoconnection;
}

module.exports = dbconnection