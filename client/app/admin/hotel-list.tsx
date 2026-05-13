import axios from 'axios'
import React from 'react'

const HotelList = async () => {
    const {data} =  await axios.get('http://localhost:8000/hotel')
  return (
    <div className='p-8 flex'>
        {data.map((item)=>{
            return (
                <div key={item.id}>
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                    <p>Average Price: ${item.averagePrice}</p>
                    <img src={item.imageUrl} alt={item.name} className='w-64 h-40 object-cover'/>
                </div>
            )
        })}
    </div>
  )
}

export default HotelList