"use client";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";

const ICON = icon({
  iconUrl:
    "https://icons.veryicon.com/png/System/Small%20%26%20Flat/map%20marker.png",
  iconSize: [50, 50],
});

const Map = ({ cityLat, cityLong }) => {
  return (
    <MapContainer
      center={[cityLat, cityLong]}
      zoom={6}
      scrollWheelZoom={false}
      className="h-[25vh] lg:h-[50vh] rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={ICON} position={[cityLat, cityLong]} />
    </MapContainer>
  );
};

export default Map;
