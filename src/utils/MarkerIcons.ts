import L, { Icon, PointExpression } from "leaflet";

import Red from "../../public/images/red.png";
import Green from "../../public/images/green.png";
import Blue from "../../public/images/blue.png";

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
