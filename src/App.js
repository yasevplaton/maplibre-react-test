import "./App.css";
import Map, { Layer, Popup, Source } from "react-map-gl";
import maplibregl from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";
import { useRef, useState } from "react";
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from "./clusters";
import { countoursLayer } from "./vector-tile";
import { NavigateButton } from "./NavigateButton";

const MAP_TILER_KEY = "hE7PBueqYiS7hKSYUXP9";

function App() {
  const mapRef = useRef(null);
  const [showPopup, setShowPopup] = useState(true);

  const onClick = (event) => {
    try {
      const feature = event.features[0];
      const clusterId = feature.properties.cluster_id;

      const mapboxSource = mapRef.current.getSource("earthquakes");

      mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) {
          return;
        }

        mapRef.current.easeTo({
          center: feature.geometry.coordinates,
          zoom,
          duration: 500,
        });
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Map
      mapLib={maplibregl}
      mapStyle={`https://api.maptiler.com/maps/voyager/style.json?key=${MAP_TILER_KEY}`}
      style={{ width: "100vw", height: "100vh" }}
      initialViewState={{
        latitude: 40.67,
        longitude: -103.59,
        zoom: 3,
      }}
      ref={mapRef}
      interactiveLayerIds={[clusterLayer.id]}
      onClick={onClick}
    >
      {showPopup && (
        <Popup
          longitude={-100}
          latitude={40}
          anchor="bottom"
          onClose={() => setShowPopup(false)}
        >
          <div style={{ color: "red", fontWeight: "bold" }}>You are here</div>
        </Popup>
      )}
      <Source
        id="earthquakes"
        type="geojson"
        data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
        cluster={true}
        clusterMaxZoom={14}
        clusterRadius={50}
      >
        <Layer {...clusterLayer} />
        <Layer {...clusterCountLayer} />
        <Layer {...unclusteredPointLayer} />
      </Source>
      <Source
        id="countours"
        type="vector"
        url="https://api.maptiler.com/tiles/contours/tiles.json?key=hE7PBueqYiS7hKSYUXP9"
      >
        <Layer {...countoursLayer} />
      </Source>
      <NavigateButton />
    </Map>
  );
}

export default App;
