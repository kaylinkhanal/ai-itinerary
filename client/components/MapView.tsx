"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useEffect } from "react";
import { MapPin, Navigation, Route } from "lucide-react";
import axios from "axios";

// Fix default marker icons broken by webpack
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


//  "temple", "lake", "mountain", "cultural_site", "adventure_spot", "hidden_gem", "hotel", "waterfall"


const templeIcon = new L.Icon({ iconUrl: 'temple.svg', iconSize: [25, 41] });
const hotelIcon = new L.Icon({ iconUrl: 'hotel.svg', iconSize: [30, 41] });
const defaultIcon = new L.Icon({ iconUrl: 'default.svg', iconSize: [25, 41] });
const mountainIcon = new L.Icon({ iconUrl: 'mountain.svg', iconSize: [25, 41] });
const parkIcon = new L.Icon({ iconUrl: 'park.svg', iconSize: [25, 41] });
const waterfallIcon = new L.Icon({ iconUrl: 'waterfall.svg', iconSize: [25, 41] });
const caveIcon = new L.Icon({ iconUrl: 'cave.svg', iconSize: [25, 41] });
const lakeIcon = new L.Icon({ iconUrl: 'lake.svg', iconSize: [25, 41] });
const hikeIcon = new L.Icon({ iconUrl: 'hike.svg', iconSize: [25, 41] });
const extra_activityIcon = new L.Icon({ iconUrl: 'exercise.svg', iconSize: [25, 41] });
const riverIcon = new L.Icon({ iconUrl: 'river.svg', iconSize: [25, 41] });
const national_parkIcon = new L.Icon({ iconUrl: 'national-park.svg', iconSize: [25, 41] });
const airportIcon = new L.Icon({ iconUrl: 'plane.svg', iconSize: [25, 41] });
const museumIcon = new L.Icon({ iconUrl: 'museum.svg', iconSize: [25, 41] });

const getMarkerIcon = (type?: string) => {
  if (!type) return defaultIcon;
  
  // Convert to lowercase so "Temple" and "temple" both work
  const t = type.toLowerCase();

  // Keyword checks
  if (t.includes("temple") || t.includes("monastery") || t.includes("spiritual")) return templeIcon;
  if (t.includes("hotel") || t.includes("resort") || t.includes("stay")) return hotelIcon;
  if (t.includes("mountain") || t.includes("hill") || t.includes("viewpoint")) return mountainIcon;
  if (t.includes("national")) return national_parkIcon;
  if (t.includes("park") || t.includes("garden")) return parkIcon;
  if (t.includes("waterfall")) return waterfallIcon;
  if (t.includes("cave")) return caveIcon;
  if (t.includes("hike") || t.includes("trek")) return hikeIcon;
  if (t.includes("lake") || t.includes("beach")) return lakeIcon;
  if (t.includes("river")) return riverIcon;
  if (t.includes("museum") || t.includes("cultural")) return museumIcon;
  if (t.includes("airport") || t.includes("plane")) return airportIcon;
  if (t.includes("yoga") || t.includes("exercise") || t.includes("activity")) return extra_activityIcon;

  // Fallback if no keywords match
  return defaultIcon;
};


function Recenter({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 13, { animate: true });
  }, [lat, lng, map]);
  return null;
}

interface MapViewProps {
  center?: { lat: number; lng: number };
  label?: string;
  itinerary?: {
    destination?: string;
    itinerary?: {
      day: number;
      theme?: string;
      activities?: {
        location: string;
        description: string;
        locationType?: string;
        coordinates?: { lat: number; lng: number };
      }[];
    }[];
  } | null;
}


export default function MapView({ center, label,itinerary }: MapViewProps) {
  const defaultCenter: [number, number] = [20, 0];
  const zoom = center ? 13 : 2;
  const activities =
    itinerary?.itinerary?.flatMap((day) =>
      day.activities?.filter((item) => item.coordinates?.lat && item.coordinates?.lng) ?? []
    ) ?? [];

    const reserveHotel =async (location) => {
      const {data} = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/reserve-hotel", { location });
      if(data.success){
        alert(`Hotel at ${location} reserved successfully!`);
      } else {
        alert(`Failed to reserve hotel at ${location}. Please try again.`);
      }
    }

  return (
    <div className="relative h-full w-full overflow-hidden bg-slate-100">
      <div className="absolute left-4 right-4 top-4 z-[500] rounded-lg border border-white/70 bg-white/90 p-4 shadow-lg shadow-slate-900/10 backdrop-blur">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Travel map</p>
            <h2 className="truncate text-lg font-semibold text-slate-950">
              {itinerary?.destination || label || "Your itinerary route"}
            </h2>
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-500">
            <Navigation className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
          <Route className="h-4 w-4 text-slate-400" />
          <span>{activities.length ? `${activities.length} mapped stops` : "Ready for mapped stops"}</span>
        </div>
      </div>
      {!center && (
        <div className="absolute inset-x-6 top-1/2 z-[500] flex -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-white/85 p-6 text-slate-500 shadow-sm backdrop-blur pointer-events-none">
          <MapPin className="h-8 w-8 text-rose-400" />
          <p className="text-sm font-semibold text-slate-700">Map view</p>
          <p className="max-w-56 text-center text-xs">Generate an itinerary to see hotels, sights, and daily stops here.</p>
        </div>
      )}
      <MapContainer
        center={center ? [center.lat, center.lng] : defaultCenter}
        zoom={zoom}
        className="w-full h-full"
        style={{ minHeight: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {center && <Recenter lat={center.lat} lng={center.lng} />}
        {itinerary && itinerary?.itinerary?.map((activity, i) => {
         return   activity.activities?.map((item,id) => {
          if (!item.coordinates?.lat || !item.coordinates?.lng) return null;
            return (
              <Marker  icon={getMarkerIcon(item.locationType)}  key={`${i}-${id}`} position={[item.coordinates.lat, item.coordinates.lng]}>
                <Popup>
                  <strong>{item.location}</strong>
                  <p>{item.description}</p>
                  {item?.locationType === 'hotel' && <button onClick={()=>reserveHotel(item.location)} className='bg-green-200'>Reserve now</button>}
                </Popup>
              </Marker>
            )
          })
         }
      )}
   
      </MapContainer>
    </div>
  );
}
