import React from 'react';
import { FeatureTemplate, FeatureItem } from 'assets/styles/style';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export const LandmarksMapTile = ({ landmarks }) => {
  return (
    <FeatureTemplate>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} dragging={false} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </FeatureTemplate>
  );
};
