import React from "react";
import "./BlockInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BlockInfo = ({ title, content, icon }) => {
  return (
    <div className="d-flex block-info">
      <FontAwesomeIcon icon={icon} className="icon" />
      <div className="d-flex fdc">
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default BlockInfo;
