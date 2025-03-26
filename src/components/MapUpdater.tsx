import { useEffect } from "react";
import { useMap } from "@vis.gl/react-google-maps";

interface MapUpdaterProps {
  location: { lat: number; lng: number };
}

const MapUpdater: React.FC<MapUpdaterProps> = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    if (map && location) {
      map.setCenter(location);
      map.setZoom(15);
    }
  }, [map, location]);
  return null;
};
export default MapUpdater;