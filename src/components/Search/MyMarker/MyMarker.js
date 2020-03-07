import React from "react";
import { Marker, OverlayView } from "@react-google-maps/api";
import "./MyMarker.css";

const MyMarker = ({ resto }) => {
  let icon;
  switch (resto.type) {
    case "vegan":
      icon =
        "https://d1mvj2ulps5lli.cloudfront.net/map_marker/vegan_marker.svg";
      break;
    case "vegetarian":
      icon =
        "https://d1mvj2ulps5lli.cloudfront.net/map_marker/vegetarian_marker.svg";
      break;
    case "veg-options":
      icon =
        "https://d1mvj2ulps5lli.cloudfront.net/map_marker/veg_options_marker.svg";
      break;
    default:
      icon =
        "https://d1mvj2ulps5lli.cloudfront.net/map_marker/health_store_marker.svg";
  }

  return (
    <Marker
      key={"mark" + resto._id}
      animation={window.google.maps.Animation.DROP}
      position={{
        lat: Number(resto.location.lat),
        lng: Number(resto.location.lng)
      }}
      onMouseOver={() => {
        const elem = document.getElementById("infos" + resto._id);
        elem.style.display = "inherit";
      }}
      onMouseOut={() => {
        const elem = document.getElementById("infos" + resto._id);
        elem.style.display = "none";
      }}
      icon={icon}
    >
      <OverlayView
        className="infos-anchor"
        position={{
          lat: Number(resto.location.lat),
          lng: Number(resto.location.lng)
        }}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      >
        <div className="infos-map" id={"infos" + resto._id}>
          <h1>{resto.name}</h1>
          <p>{resto.adress}</p>
        </div>
      </OverlayView>
    </Marker>
  );
};

export default MyMarker;
