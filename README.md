Ai iteneray 

Phase 1:
Authentication: Register/login with JWT, optional Google OAuth, role-based access (traveller vs admin), password reset via email token.
User profiles: Travel preference tags like adventure, relaxation, culture, budget range, avatar upload, trip history, saved/wishlisted destinations.
Destination search: Keyword search, category filters like beach, city, nature, budget tier filter, curated "featured destinations" seeded in MongoDB.

Phase 2:
AI integration: Natural language input ("plan me 5 days in Japan under $1500"), LLM API call (OpenAI/Gemini), follow-up refinement, session context memory so the user can keep tweaking without starting over.
Itinerary builder: Auto-generated day-by-day schedule from AI output, drag-to-reorder stops, activity time slots, save/edit/delete trips, sharable public link.
Map integration: Mapbox GL JS or Google Maps, each stop pinned, route polyline drawn between pins, estimated travel time between stops, cluster view for dense itineraries.

Phase 3:
Community feed: Public trip posts, likes and bookmarks, follow other travellers, trending destinations, comment threads separating review threads.
Budget tracker: Per-trip budget cap, expense categories (food, transport, lodging), estimated vs actual costs, currency conversion via an exchange rate API, visual bar/donut chart, export to PDF or CSV.
UX polish: Mobile-first UI layout, dark/light mode toggle, 