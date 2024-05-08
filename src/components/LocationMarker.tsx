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
import { Marker, Popup, useMap } from "react-leaflet";
import Blue from "../../public/images/blue.png";
import { blue } from "@/utils/MarkerIcons";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setSinalGPS } from "@/store/slices/mapSlice";

const LocationMarker = () => {
  const [position, setPosition] = useState<LatLngExpression>();
  const [draggable, setDraggable] = useState(false);
  const markerRef = useRef<MarkerType>(null);
  const dispatch = useAppDispatch();
  const mapState = useAppSelector((state) => state.map);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );

  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  const map = useMap();

  useEffect(() => {
    if (typeof window !== "undefined") {
      map
        .locate()
        .on("locationfound", (e) => {
          setPosition(e.latlng as LatLngExpression);
          map.flyTo(e.latlng, map.getZoom());
          dispatch(setSinalGPS(true));
        })
        .on("locationerror", (e) => {
          dispatch(setSinalGPS(false));
        });
    }
  }, [mapState]);

  return position === undefined ? null : (
    <Suspense>
      {typeof window !== "undefined" ? (
        <div onClick={toggleDraggable}>
          <Marker
            position={position}
            icon={blue}
            draggable={draggable}
            eventHandlers={eventHandlers}
          >
            <Popup>Você está aqui!</Popup>
          </Marker>
        </div>
      ) : null}
    </Suspense>
  );
};

export default LocationMarker;
