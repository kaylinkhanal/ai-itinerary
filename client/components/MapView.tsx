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
              <Marker key={id} position={[item.coordinates.lat, item.coordinates.lng]}>
                <Popup>
                  <strong>{item.location}</strong>
                  <p>{item.description}</p>
                </Popup>
              </Marker>
            )
          })
         }
      )}
        {center && (
          <>
            <Recenter lat={center.lat} lng={center.lng} />
            <Marker position={[center.lat, center.lng]}>
              {label && <Popup>{label}</Popup>}
            </Marker>
          </>
        )}
      </MapContainer>
    </div>
  );
}
