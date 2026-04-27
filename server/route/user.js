const express = require('express')
const bcrypt = require('bcryptjs')
const { default: User } = require('../models/user')
const { registerNewUser, loginUser } = require('../controller/user')
const router = express.Router()

router.post('/register', registerNewUser)
router.post('/login', loginUser)


module.exports = router