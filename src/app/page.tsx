"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import api from "../../api";
import { Solicitacao } from "@/models/Solicitacao";
// import { useMap } from "react-leaflet/hooks";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import SolicitacaoCard from "@/components/SolicitacaoCard";

export default function Home() {
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  useEffect(() => {
    api.get("/solicitacoes").then((res) => {
      if (res.status === 200) {
        setSolicitacoes(res.data as Solicitacao[]);
      }
    });
  }, []);

  return (
    <main className="flex flex-row min-h-screen justify-between p-3">
      {solicitacoes.length > 0 ? (
        <MapContainer
          center={[-29.999834, -51.104045]}
          zoom={11}
          scrollWheelZoom={true}
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
              position={el.endereco.coordernadas
                .split(",")
                .map((item) => parseFloat(item))}
            ></Marker>
          ))}
        </MapContainer>
      ) : null}

      <div className="p-3 mx-3 border rounded h-full w-full text-gray-800 shadow">
        <div>
          <h3>
            <b>Últimos registros:</b>
          </h3>
        </div>
        <hr />
        {solicitacoes.map((el, key) => (
          <SolicitacaoCard props={el} />
        ))}
      </div>
    </main>
  );
}
