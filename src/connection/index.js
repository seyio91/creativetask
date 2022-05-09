const mongoconnection = require("./mongodb");

let dbconnection = null;

let DB_ENGINE = "mongodb";
if (DB_ENGINE == "mongodb") {
    // Support for multiple DB engine connection
    dbconnection = mongoconnection;
}

module.exports = dbconnection