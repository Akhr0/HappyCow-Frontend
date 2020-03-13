import React from "react";
import "./VegStatus.css";

const VegStatus = ({ type }) => {
  let color;
  let picto;
  switch (type) {
    case "vegan":
      color = "green";
      picto = "https://www.happycow.net/img/category/category_vegan.svg";
      break;
    case "vegetarian":
      color = "purple";
      picto = "https://www.happycow.net/img/category/category_vegetarian.svg";
      break;
    default:
      color = "red";
      picto = "https://www.happycow.net/img/category/category_veg-options.svg";
      break;
  }
  return (
    <button
      className={
        color === "green"
          ? "green btn-status d-flex aic"
          : color === "purple"
          ? "purple btn-status d-flex aic"
          : "red btn-status d-flex aic"
      }
    >
      <img src={picto} alt="picto" />
      {type}
    </button>
  );
};

export default VegStatus;
