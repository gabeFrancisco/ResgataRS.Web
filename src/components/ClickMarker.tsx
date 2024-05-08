import {
  setCoordenadas,
  setCoordenadasClick,
  setSelecao,
} from "@/store/slices/mapSlice";
import { useAppDispatch } from "@/store/store";
import L from "leaflet";
import React, { useEffect, useState } from "react";
import { useMapEvents } from "react-leaflet";

const ClickMarker = () => {
  const dispatch = useAppDispatch();
  const layer = new L.LayerGroup();
  const [coordernadas, setCoordenadas] = useState<number[]>();
  const map = useMapEvents({
    click: async (e) => {
      // dispatch(setSelecao(true));
      layer.clearLayers();
      const marker = L.marker(e.latlng);
      layer.addLayer(marker);
      map.addLayer(layer);
      setCoordenadas([e.latlng.lat, e.latlng.lng]);
    },
  });

  useEffect(() => {
    dispatch(setCoordenadasClick(coordernadas!));
    layer.clearLayers();
  }, [coordernadas]);
  return <div></div>;
};

export default ClickMarker;
