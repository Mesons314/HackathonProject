import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "600px",
};

const defaultCenter = { lat: 40.7128, lng: -74.0060 }; // Default to New York

const MapComponent = ({ shops }) => {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={defaultCenter}>
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
