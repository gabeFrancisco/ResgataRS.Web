"use client";

import { Suspense, useEffect, useRef } from "react";
import { CircleMarker, Marker, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import L, { LatLngExpression } from "leaflet";
import LocationMarker from "./LocationMarker";
import { red } from "@/utils/MarkerIcons";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  getAllCoordenadas,
  setCoordenadaSelecionada,
  setCoordenadas,
  setSelecao,
} from "@/store/slices/mapSlice";
import { getAllSolicitacoes } from "@/store/slices/solicitacaoSlice";

const Mapa = () => {
  const layer = new L.LayerGroup();
  const dispatch = useAppDispatch();
  const mapRef = useRef<L.Map>(null);
  const mapState = useAppSelector((state) => state.map);
  const coordenadas = useAppSelector((state) => state.map.coordenadasList);

  const handlePosition = () => {
    mapRef.current?.locate().on("locationfound", (e) => {
      dispatch(setCoordenadas([e.latlng.lat, e.latlng.lng]));
      dispatch(setSelecao(false));
    });
  };

  const handleUpdate = () => {
    dispatch(getAllSolicitacoes());
  };

  useEffect(() => {
    dispatch(getAllCoordenadas());
  }, []);

  useEffect(() => {
    mapRef.current &&
      mapRef.current!.flyTo(mapState.coordenadas as LatLngExpression, 16);
  }, [mapState.coordenadas]);

  useEffect(() => {
    mapRef.current?.locate().on("locationfound", (e) => {
      dispatch(setCoordenadaSelecionada([e.latlng.lat, e.latlng.lng]));
      dispatch(setCoordenadas([e.latlng.lat, e.latlng.lng]));
      dispatch(setSelecao(false));
    });
  }, [mapState.selecao == true]);

  useEffect(() => {
    layer.clearLayers();
  }, [mapState.coordenadasClick]);

  return (
    <Suspense>
      {coordenadas && typeof window !== "undefined" ? (
        <>
          <MapContainer
            ref={mapRef}
            center={[-29.999834, -51.104045]}
            zoom={11}
            scrollWheelZoom={true}
            style={{ width: "100%" }}
            className="border shadow rounded w-10/12 min-h-96 lg:h-screen flex-1 z-0"
          >
            <LocationMarker />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              className="z-0"
            />
            <CircleMarker
              center={mapState.coordenadas as LatLngExpression}
              radius={20}
              weight={1}
              fillColor="#d92"
              color="#e33"
            />
            <div className="map-buttons">
              <button
                type="submit"
                onClick={handlePosition}
                className="bg-blue-100 shadow text-gray-700 px-1 py-0.5 rounded border hover:bg-blue-200 border-gray-300 mr-2"
              >
                Localização atual
              </button>
              <button
                type="submit"
                onClick={handleUpdate}
                className="bg-green-100 shadow text-gray-700 px-1 py-0.5 rounded border hover:bg-green-200 border-gray-300 "
              >
                Atualizar
              </button>
            </div>
            {coordenadas.length > 0 &&
              coordenadas?.map((el, key) => (
                <Marker
                  key={key}
                  icon={red}
                  position={
                    el.coordenadas
                      .split(",")
                      .map((item) => parseFloat(item)) as LatLngExpression
                  }
                >
                  <Popup>Número de pessoas: {el.numeroPessoas}</Popup>
                </Marker>
              ))}
          </MapContainer>
        </>
      ) : null}
    </Suspense>
  );
};

export default Mapa;
