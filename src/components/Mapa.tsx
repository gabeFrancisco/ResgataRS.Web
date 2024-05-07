"use client";

import { Suspense, useContext, useEffect, useRef, useState } from "react";
import {
  Circle,
  CircleMarker,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Solicitacao } from "@/models/Solicitacao";
import L, { ControlPosition, LatLngExpression, map } from "leaflet";
import api from "../../api";
import LocationMarker from "./LocationMarker";
import { red } from "@/utils/MarkerIcons";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setCoordenadaSelecionada, setSelecao } from "@/store/slices/mapSlice";

const Mapa = () => {
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([]);
  const mapRef = useRef<L.Map>(null);
  const mapState = useAppSelector((state) => state.map);
  const dispatch = useAppDispatch();

  useEffect(() => {
    api.get("/solicitacoes").then((res) => {
      if (res.status === 200) {
        setSolicitacoes(res.data as Solicitacao[]);
      }
    });
  }, []);

  useEffect(() => {
    mapRef.current &&
      mapRef.current!.flyTo(mapState.coordenadas as LatLngExpression, 16);
  }, [mapState.coordenadas]);

  useEffect(() => {
    mapRef.current?.locate().on("locationfound", (e) => {
      dispatch(setCoordenadaSelecionada([e.latlng.lat, e.latlng.lng]));
    });
    dispatch(setSelecao(false));
    mapRef.current?.locate().on("locationerror", () => {
      alert(
        "GPS não conectado! Ative sua localização, tente novamente, ou selecionado o local no mapa!"
      );
      dispatch(setSelecao(false));
    });
  }, [mapState.selecao === true]);

  return (
    <Suspense>
      {solicitacoes && typeof window !== "undefined" ? (
        <MapContainer
          ref={mapRef}
          center={[-29.999834, -51.104045]}
          zoom={11}
          scrollWheelZoom={true}
          style={{ width: "100%" }}
          className="border shadow rounded w-10/12 min-h-96 lg:h-screen flex-1"
        >
          <LocationMarker />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <CircleMarker
            center={mapState.coordenadas as LatLngExpression}
            radius={20}
            weight={1}
            fillColor="#d92"
            color="#e33"
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
