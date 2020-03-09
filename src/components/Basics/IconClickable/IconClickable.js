import React from "react";
import "./IconClickable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

const IconClickable = ({ icon, path, color, size }) => {
  const sizeRem = size + "rem";
  const history = useHistory();
  return (
    <FontAwesomeIcon
      icon={icon}
      onClick={() => {
        history.push(path);
      }}
      style={{
        color: color,
        fontSize: sizeRem,
        margin: "0 10px",
        cursor: "pointer"
      }}
    />
  );
};

export default IconClickable;
