"use client";

import { useEffect, useState } from "react";
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
    <>
      {solicitacoes && typeof window !== "undefined" ? (
        <MapContainer
          center={[-29.999834, -51.104045]}
          zoom={11}
          scrollWheelZoom={false}
          style={{ height: "90vh", width: "100%", padding: "" }}
          className="border shadow rounded h-full"
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
    </>
  );
};

export default Mapa;
