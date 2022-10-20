import { useMap } from "react-map-gl";

export function NavigateButton() {
  const { current: map } = useMap();

  const onClick = () => {
    map.flyTo({ center: [-122.4, 37.8] });
  };

  return (
    <button
      onClick={onClick}
      style={{ position: "absolute", top: 10, left: 10 }}
    >
      Go
    </button>
  );
}
