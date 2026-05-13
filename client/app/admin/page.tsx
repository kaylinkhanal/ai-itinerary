import React from 'react'
import AdminAddHotel from './hotel-add-form'
import HotelList from './hotel-list'

const page = () => {
  return (
    <div>
        <HotelList/>
        <AdminAddHotel/>
    </div>
  )
}

export default page