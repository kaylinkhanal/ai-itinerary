"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useEffect } from "react";
import { MapPin } from "lucide-react";

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

const getMarkerIcon = (type) => {
  if (!type) return defaultIcon;
  
  // Convert to lowercase so "Temple" and "temple" both work
  const t = type.toLowerCase();

  // Keyword checks
  if (t.includes("temple") || t.includes("monastery") || t.includes("spiritual")) return templeIcon;
  if (t.includes("hotel") || t.includes("resort") || t.includes("stay")) return hotelIcon;
  if (t.includes("mountain") || t.includes("hill") || t.includes("viewpoint")) return mountainIcon;
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
}


export default function MapView({ center, label,itinerary }: MapViewProps) {
  const defaultCenter: [number, number] = [20, 0];
  const zoom = center ? 13 : 2;
  console.log(itinerary)
  return (
    <div className="w-full h-full flex flex-col">
      {!center && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-400 z-10 pointer-events-none">
          <MapPin className="w-8 h-8" />
          <p className="text-sm font-medium">Map view</p>
          <p className="text-xs text-center px-4">Generate an itinerary to see the map</p>
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
        {itinerary && itinerary?.itinerary?.map((activity, i) => {
         return   activity.activities?.map((item,id) => {
            return (
              <Marker  icon={getMarkerIcon(item.locationType)}  key={id} position={[item.coordinates.lat, item.coordinates.lng]}>
                <Popup>
                  <strong>{item.location}</strong>
                  <p>{item.description}</p>
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
