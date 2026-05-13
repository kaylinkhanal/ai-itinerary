const express = require('express')
const { registerNewHotel, getHotels } = require('../controller/hotel')
const router = express.Router()

router.post('/hotel', registerNewHotel)
router.get('/hotel', getHotels)


module.exports = router