export const countoursLayer = {
  id: "terrain-data",
  type: "line",
  source: "contours",
  "source-layer": "contour",
  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
  paint: {
    "line-color": "#ff69b4",
    "line-width": 1,
  },
};
