"use client";

import L, { LatLng, LatLngExpression, Marker as MarkerType } from "leaflet";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import Blue from "../../public/images/blue.png";
import { blue } from "@/utils/MarkerIcons";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  setCoordenadaSelecionada,
  setCoordenadasClick,
  setSinalGPS,
} from "@/store/slices/mapSlice";

const LocationMarker = () => {
  const [position, setPosition] = useState<LatLngExpression>();
  const dispatch = useAppDispatch();
  const mapState = useAppSelector((state) => state.map);
  const map = useMapEvents({
    click: (e) => {
      if (!mapState.sinalGPS) {
        dispatch(setCoordenadaSelecionada([e.latlng.lat, e.latlng.lng]));
        setPosition(e.latlng as LatLngExpression);
      }
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      map
        .locate()
        .on("locationfound", (e) => {
          setPosition(e.latlng as LatLngExpression);
          map.flyTo(e.latlng, map.getZoom());
          dispatch(setSinalGPS(true));
          // dispatch(setCoordenadasClick([e.latlng.lat, e.latlng.lng]));
        })
        .on("locationerror", (e) => {
          dispatch(setSinalGPS(false));
        });
    }
  }, [mapState.sinalGPS]);

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
