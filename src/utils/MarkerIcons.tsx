"use client";

import Red from "../../public/assets/red.png";
import Green from "../../public/assets/green.png";
import Blue from "../../public/assets/blue.png";
import L from "leaflet";

export const red = L.icon({
  iconUrl: Red.src,
  iconSize: [35, 35],
});

export const green = L.icon({
  iconUrl: Green.src,
  iconSize: [35, 35],
});

export const blue = L.icon({
  iconUrl: Blue.src,
  iconSize: [40, 40],
});
