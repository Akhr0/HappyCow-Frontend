import React from "react";
import "./MiniMap.css";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MiniMap = props => {
  return (
    <LoadScript
      id="mini-map-loader"
      googleMapsApiKey="AIzaSyDLF83Idktv9zx1_sUyZaB7Pw7znskEiFg"
    >
      <GoogleMap
        id="mini-map"
        mapContainerStyle={{
          height: "200px",
          width: "100%"
        }}
        zoom={13}
        center={{ lat: 48.866667, lng: 2.333333 }}
        clickableIcons={false}
      >
        <Marker position={{ lat: 48.866667, lng: 2.333333 }} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MiniMap;
