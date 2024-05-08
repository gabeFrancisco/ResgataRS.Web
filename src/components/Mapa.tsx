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
import L, { ControlPosition, LatLngExpression, Map, map } from "leaflet";
import api from "../../api";
import LocationMarker from "./LocationMarker";
import { red } from "@/utils/MarkerIcons";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setCoordenadaSelecionada, setSelecao } from "@/store/slices/mapSlice";
import { getAllSolicitacoes } from "@/store/slices/solicitacaoSlice";
import ClickMarker from "./ClickMarker";

const Mapa = () => {
  const dispatch = useAppDispatch();
  const mapRef = useRef<L.Map>(null);
  const mapState = useAppSelector((state) => state.map);
  const solicitacoes = useAppSelector(
    (state) => state.solicitacoes.solicitacaoList
  );

  useEffect(() => {
    dispatch(getAllSolicitacoes());
  }, []);

  useEffect(() => {
    mapRef.current &&
      mapRef.current!.flyTo(mapState.coordenadas as LatLngExpression, 14);
  }, [mapState.coordenadas]);

  useEffect(() => {
    mapRef.current?.locate().on("locationfound", (e) => {
      dispatch(setCoordenadaSelecionada([e.latlng.lat, e.latlng.lng]));
      dispatch(setSelecao(false));
    });
  }, [mapState.selecao == true]);

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
          {!mapState.sinalGPS && <ClickMarker />}
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
