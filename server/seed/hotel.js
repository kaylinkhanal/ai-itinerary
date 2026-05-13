const mongoose = require('mongoose');

const { default: connectDb } = require('../db/connect');
const hotel = require('../models/hotel');

const hotels = [
  {
    name: "Temple Tree Resort & Spa",
    description: "An Art Deco inspired resort near Phewa Lake featuring an outdoor pool and a full-service spa.",
    coordinates: { lat: 28.2055, lng: 83.9575 },
    averagePrice: 12000,
    rooms: ['double', 'suite'],
    specialOffers: "10% off for stays longer than 3 nights",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945"
  },
  {
    name: "Zostel Pokhara",
    description: "Basic quarters in a casual hostel with an open-air bar, a TV lounge & free Wi-Fi, plus lake views.",
    coordinates: { lat: 28.2120, lng: 83.9585 },
    averagePrice: 1800,
    rooms: ['single', 'double'],
    specialOffers: "Happy hour daily from 5 PM to 7 PM",
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4"
  },
  {
    name: "Sarangkot Mountain Lodge",
    description: "Perched on a ridge providing panoramic views of the Annapurna range and Pokhara valley.",
    coordinates: { lat: 28.2392, lng: 83.9481 },
    averagePrice: 25000,
    rooms: ['suite'],
    specialOffers: "Complimentary sunrise breakfast",
    imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd"
  }
];

const seedDB = async () => {
  try {
    // 1. Connect to MongoDB (Replace with your actual connection string)
   connectDb()
    console.log("Connected to MongoDB...");


    // 3. Insert the new data
    await hotel.insertMany(hotels);
    console.log("Database seeded successfully!");

    // 4. Close the connection
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

seedDB();