const router = require('express').Router();

const { createUser, singleUser, allUsers, health } = require('./user.controller')

router.post('/create', createUser)

router.post('/getuser', singleUser)

router.get('/', allUsers)

router.get('/health', health)

module.exports = router