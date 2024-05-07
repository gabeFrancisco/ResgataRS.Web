"use client";

import { Suspense, useContext, useEffect, useRef, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Solicitacao } from "@/models/Solicitacao";
import L, { ControlPosition, LatLngExpression, map } from "leaflet";
import api from "../../api";
import LocationMarker from "./LocationMarker";
import { red } from "@/utils/MarkerIcons";
import { useAppSelector } from "@/store/store";

const Mapa = () => {
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  const mapRef = useRef<L.Map>(null);
  const mapState = useAppSelector((state) => state.map);

  useEffect(() => {
    api.get("/solicitacoes").then((res) => {
      if (res.status === 200) {
        setSolicitacoes(res.data as Solicitacao[]);
      }
    });
  }, []);

  useEffect(() => {
    console.log(mapState.coordenadas);
    mapRef.current &&
      mapRef.current!.flyTo(mapState.coordenadas as LatLngExpression, 16);
  }, [mapState]);

  return (
    <Suspense>
      {solicitacoes && typeof window !== "undefined" ? (
        <MapContainer
          ref={mapRef}
          center={[-29.999834, -51.104045]}
          zoom={11}
          scrollWheelZoom={false}
          style={{ width: "100%" }}
          className="border shadow rounded w-10/12 min-h-96 lg:h-screen flex-1"
        >
          <LocationMarker />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {solicitacoes.map((el, key) => (
            <Marker
              key={key}
              icon={red}
              position={
                el.endereco.coordernadas
                  .split(",")
                  .map((item) => parseFloat(item)) as LatLngExpression
              }
            >
              <Popup>Número de pessoas: {el.numeroPessoas}</Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : null}
    </Suspense>
  );
};

export default Mapa;
