"use client";

import { Suspense, useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Solicitacao } from "@/models/Solicitacao";
import { LatLngExpression } from "leaflet";
import api from "../../api";

const Mapa = () => {
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  useEffect(() => {
    api.get("/solicitacoes").then((res) => {
      if (res.status === 200) {
        setSolicitacoes(res.data as Solicitacao[]);
      }
    });
  }, []);
  return (
    <Suspense>
      {solicitacoes && typeof window !== "undefined" ? (
        <MapContainer
          center={[-29.999834, -51.104045]}
          zoom={11}
          scrollWheelZoom={false}
          style={{ width: "100%" }}
          className="border shadow rounded w-10/12 min-h-96 lg:h-screen flex-1"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {solicitacoes.map((el, key) => (
            <Marker
              key={key}
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
