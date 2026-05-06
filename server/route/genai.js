const { GoogleGenAI } = require('@google/genai');
const express = require('express');

const router = express.Router()

const ai = new GoogleGenAI({ 
  apiKey: "AIzaSyA8DnbU35YKb0lyu36MO69v9W8LQEav3zg"
});

router.post('/generate', async (req, res) => {
  try {
      const { prompt } = req.body;

      if (!prompt) {
          return res.status(400).json({ error: "No prompt provided" });
      }

      // Using the Gemini 3 Flash model as per your documentation snippet
      const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: `User gave this prompt ${prompt}, we are developing a app like mindtrip that user would ask questions related to travel plan and itenieary, Role: Expert Travel Architect. Tone: Nepali style welcoming tone while you reply the message,  Objective: Transform vague travel inputs into logically routed, high-efficiency itineraries. Output Format: STRICT JSON ONLY. Do not include conversational filler, markdown outside the JSON, or preamble. Constraint Checklist: Geographic Grouping: Activities must be clustered to minimize transit time. Daily Structure: Include morning, afternoon, and evening segments, plus realistic meal breaks. Hidden Gems: One "off-the-beaten-path" suggestion per day. Accommodation: Suggest one highly-rated hotel per destination with specific latitude and longitude. Example: if you give Phewa Lake & Tal Barahi Temple, its latitude and longitude should also be included in the json response, Contextual Awareness: Include 2026-specific local events and seasonal weather advice. Required JSON Schema: JSON { "destination": "string", "travel_dates_context": "2026", "seasonal_considerations": "string", "local_events_2026": ["string"], "accommodation": { "name": "string", "description": "string", "coordinates": { "lat": "number", "lng": "number" } }, "itinerary": [ { "day": "number", "theme": "string", "activities": "activities": [ { "time_slot": "", "location": "", "description": "", "coordinates": { "lat": 0.0, "lng": 0.0 }, "is_off_beaten_path": false } ]  }` ,
      });

      res.json({
          text: response.text
      });

  } catch (error) {
      console.error("Gemini 3 API Error:", error);
      res.status(500).json({
          success: false,
          message: error.message
      });
  }
});

module.exports = router;

