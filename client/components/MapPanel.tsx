"use client";

import dynamic from "next/dynamic";

const MapView = dynamic(() => import("./MapView"), { ssr: false });

interface MapPanelProps {
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

export default function MapPanel({ center, label, itinerary }: MapPanelProps) {
  return <MapView center={center} label={label} itinerary={itinerary} />;
}
