import Hotel from '../models/hotel.js';

const registerNewHotel = async (req, res) => {
  await Hotel.create(req.body)
  res.send('Hotels created')
}


const getHotels = async (req, res) => {
  const hotels = await Hotel.find();
  res.send(hotels)
}

const updateHotelDetails =async (req, res) => {
  await Hotel.findByIdAndUpdate(req.params.id, req.body) 
  res.send('Hotel details updated')
}


const deleteHotel = async (req, res) => {
  await Hotel.findByIdAndDelete(req.params.id) 
  res.send('Hotel details deleted')
}

const reserveHotel = async (req, res) => {
  const hotel = await Hotel.findOne({name: req.body.location})
  console.log(hotel)
}



export  { registerNewHotel, getHotels,deleteHotel,updateHotelDetails,reserveHotel }


