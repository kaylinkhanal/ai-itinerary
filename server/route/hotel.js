const express = require('express')
const { registerNewHotel, getHotels,reserveHotel } = require('../controller/hotel')
const router = express.Router()

router.post('/hotel', registerNewHotel)
router.get('/hotel', getHotels)
router.post('/reserve-hotel', reserveHotel)


module.exports = router