const express = require('express')
const bcrypt = require('bcryptjs')
const { default: User } = require('../models/user')
const { registerNewUser, loginUser, getAllUsers, getUserDetailsById } = require('../controller/user')
const router = express.Router()

router.post('/register', registerNewUser)
router.post('/login', loginUser)

const test= (req, res, next)=> {
   if(req.headers?.authorization){
    next()
   }else{
    res.status(401).send('Unauthorized')
   }
}
router.get('/users', test, getAllUsers)
router.get('/users/:id', getUserDetailsById)

module.exports = router