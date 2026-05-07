"use client";

import React, { useState } from 'react';
import axios from 'axios';

export default function AdminAddHotel() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    lat: '',
    lng: '',
    averagePrice: '',
    imageUrl: '',
    specialOffers: ''
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Ensure the URL matches your server port (usually 5000 or 8000)
    const response = await axios.post('http://localhost:8000/admin/add-hotel', {
        name: formData.name,
        description: formData.description,
        coordinates: { 
          lat: parseFloat(formData.lat), 
          lng: parseFloat(formData.lng) 
        },
        averagePrice: Number(formData.averagePrice),
        imageUrl: formData.imageUrl,
        specialOffers: formData.specialOffers
      });

      if (response.status === 201) {
        alert('Hotel added successfully to the database!');
        setFormData({ name: '', description: '', lat: '', lng: '', averagePrice: '', imageUrl: '', specialOffers: '' });
      }
    } catch (error) {
      console.error("Error adding hotel:", error);
      alert('Failed to add hotel. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin: Add New Hotel</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Hotel Name</label>
            <input required name="name" value={formData.name} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md focus:ring-blue-500 border-gray-300" placeholder="e.g. Hyatt Regency Pokhara" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea required name="description" value={formData.description} onChange={handleChange} rows={3} className="mt-1 w-full p-2 border rounded-md border-gray-300" placeholder="Describe the hotel amenities and view..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Latitude</label>
              <input required name="lat" type="number" step="any" value={formData.lat} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md border-gray-300" placeholder="28.2096" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Longitude</label>
              <input required name="lng" type="number" step="any" value={formData.lng} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md border-gray-300" placeholder="83.9856" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Avg Price ($)</label>
              <input required name="averagePrice" type="number" value={formData.averagePrice} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md border-gray-300" placeholder="120" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Special Offers</label>
              <input name="specialOffers" value={formData.specialOffers} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md border-gray-300" placeholder="Free Breakfast" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL (Copy from web)</label>
            <input required name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="mt-1 w-full p-2 border rounded-md border-gray-300" placeholder="https://example.com/hotel-image.jpg" />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 px-4 text-white font-bold rounded-lg transition-colors ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? 'Saving to Database...' : 'Save Hotel to Database'}
          </button>
        </form>
      </div>
    </div>
  );
}