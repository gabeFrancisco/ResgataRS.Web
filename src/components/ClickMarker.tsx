import L from "leaflet";
import React from "react";
import { useMapEvents } from "react-leaflet";

const ClickMarker = () => {
  const layer = new L.LayerGroup();
  const map = useMapEvents({
    click: (e) => {
      layer.clearLayers();
      const marker = L.marker(e.latlng);
      layer.addLayer(marker);
      map.addLayer(layer);
    },
  });
  return <div></div>;
};

export default ClickMarker;
