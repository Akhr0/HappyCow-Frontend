import React from "react";
import "./InfosResto.css";
import BlockInfo from "../BlockInfo/BlockInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InfosResto = ({ phone, adress, description }) => {
  return (
    <>
      <div className="d-flex fdc infos-resto">
        <div className="d-flex">
          <FontAwesomeIcon icon="home" className="icon" />
          <h4>Europe</h4>
        </div>
        <div className="d-flex w100 sbw">
          <BlockInfo title="Open Now" content="10:00 - 22:00" icon="clock" />
          <BlockInfo title="Contact" content={phone} icon="phone-alt" />
          <BlockInfo title="Find" content={adress} icon="map-marker-alt" />
        </div>
        <p>{description}</p>
      </div>
    </>
  );
};

export default InfosResto;
