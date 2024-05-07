"use client";

import L, { LatLng, LatLngExpression } from "leaflet";
import React, { Suspense, useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import Blue from "../../public/images/blue.png";
import { blue } from "@/utils/MarkerIcons";

const LocationMarker = () => {
  const [position, setPosition] = useState<LatLngExpression>();
  const map = useMap();

  useEffect(() => {
    if (typeof window !== "undefined") {
      map.locate().on("locationfound", (e) => {
        setPosition(e.latlng as LatLngExpression);
        map.flyTo(e.latlng, map.getZoom());
      });
    }
  }, []);

  return position === undefined ? null : (
    <Suspense>
      {typeof window !== "undefined" ? (
        <Marker position={position} icon={blue}>
          <Popup>Você está aqui!</Popup>
        </Marker>
      ) : null}
    </Suspense>
  );
};

export default LocationMarker;
