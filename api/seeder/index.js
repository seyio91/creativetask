const data = require('./user')
const logger = require('../src/utils/logger')

// DB Connection Configuration
require('../src/connection')()

const { insertMany } = require('../src/routes/users/user.service');

const loadData = async data => {
    await insertMany(data)
}

loadData(data)
    .then(() => { 
        logger.info("Loaded Users");
        process.exit(0)
    })
    .catch((error) => {
        logger.error(error.message);
        process.exit(1)
    })