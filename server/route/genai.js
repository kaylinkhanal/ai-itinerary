const { GoogleGenAI } = require('@google/genai');
const express = require('express');
const hotel = require('../models/hotel');
const chat = require('../models/chat');

const router = express.Router()

const ai = new GoogleGenAI({ 
  apiKey: "AIzaSyDEcJWy5StVZ1SHPIIQAR9YsWsy1nZA1wU"
});

router.post('/generate', async (req, res) => {
  try {
      const { prompt, conversationId } = req.body;
      const hotels = await hotel.find(); // Fetch hotels from the database
      if (!prompt) {
          return res.status(400).json({ error: "No prompt provided" });
      }
      chat.create(
        {
        userConversation: conversationId,
         messages: {
          sender: "user",
          userPrompt: prompt
         }
        }
      )

      // Using the Gemini 3 Flash model as per your documentation snippet
      const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: `

Contextual Awareness: Include 2026-specific local events and seasonal weather advice.

For every accommodation/hotel suggestion, the JSON output MUST include a valid, high-resolution 'imageUrl' string pointing to an image of the specific hotel property.

Required JSON Schema: 
{
  "destination": "string",
  "travel_dates_context": "2026",
  "seasonal_considerations": "string",
  "local_events_2026": ["string"],
  "accommodation": {
    "name": "string",
    "description": "string",
    "coordinates": { "lat": "number", "lng": "number" },
    
    "imageUrl": "string" 
  },
  "itinerary": [
    {
      "day": "number",
      "theme": "string",
      "activities": [
        {
          "time_slot": "",
          "location": "",
          "locationType": "hotel", 
          "description": "",
          "coordinates": { "lat": 0.0, "lng": 0.0 },
          
          // --- ADD THIS LINE FOR DAILY HOTELS ---
          "imageUrl": "string" 
        }
      ]
    }
  ]
}

We as a system have partnerships with only following hotels in  Nepal: ${hotels.map(hotel => hotel.name).join(', ')}. Please suggest only from these hotels for accommodation and daily hotel suggestions in the itinerary.
          User gave this prompt ${prompt}, we are developing a app like mindtrip that user would ask questions related to travel plan and itenieary, Role: Expert Travel Architect. Tone: Nepali style welcoming tone while you reply the message,  Objective: Transform vague travel inputs into logically routed, high-efficiency itineraries. Output Format: STRICT JSON ONLY. Do not include conversational filler, markdown outside the JSON, or preamble. Constraint Checklist: Geographic Grouping: Activities must be clustered to minimize transit time. Daily Structure: Include morning, afternoon, and evening segments, plus realistic meal breaks. also for each and every hotels, try to give average pricing, special offers if any, etc that makes sense.  Hidden Gems: One "off-the-beaten-path" suggestion per day. Accommodation: Suggest one highly-rated hotel per destination with specific latitude and longitude. Example: if you give Phewa Lake & Tal Barahi Temple, its latitude and longitude should also be included in the json response, Contextual Awareness: Include 2026-specific local events and seasonal weather advice. Required JSON Schema: JSON { "destination": "string", "travel_dates_context": "2026", "seasonal_considerations": "string", "local_events_2026": ["string"], "accommodation": { "name": "string", "description": "string", "coordinates": { "lat": "number", "lng": "number" } }, "itinerary": [ { "day": "number", "theme": "string", "activities": "activities": [ { "time_slot": "", "location": "","locationType": "",  "description": "", "coordinates": { "lat": 0.0, "lng": 0.0 }, "is_off_beaten_path": false } ]  locationType can be "temple and cultural_site", "lake and pond", "river including river bank" , "mountain and hill" , "adventure_spot and hiking", "extra_activities like yoga, exercise, cycling", "hidden_gem", "hotel", "waterfall" etc. there should always be one extra activities where we need to mention the hotel/guest house name to stay along with its co=oridnates and hotel details. For different days, if possible, only give nearest hotels suggestions as per the location of the activities that he did for that day. 
           } ] }` ,
      });
      chat.create(
        {
          userConversation: conversationId,
         messages: {
          sender: "AI",
          AIresponse: response.text
         }
        }
      )

      res.json({
          text: response.text
      });

      //

  } catch (error) {
      console.error("Gemini 3 API Error:", error);
      res.status(500).json({
          success: false,
          message: error.message
      });
  }
});


router.get('/chat/:userId', async (req, res) => {
    const userId = req.params.userId;
    const chatHistory = await chat.find({ user: userId })
    res.json(chatHistory);
 
})

module.exports = router;

