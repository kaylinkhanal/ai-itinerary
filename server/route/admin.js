const express = require('express');
const router = express.Router();
const Hotel = require('../models/hotel'); 

router.post('/add-hotel', async (req, res) => {
  try {
    const newHotel = new Hotel(req.body); 
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (error) {
    console.error("Database Error:", error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;