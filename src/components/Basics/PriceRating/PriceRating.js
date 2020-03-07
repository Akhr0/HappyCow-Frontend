import React from "react";
import "./PriceRating.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PriceRating = ({ price }) => {
  let dollars;
  //PRICE
  switch (price) {
    case "Inexpensive":
      dollars = [
        <FontAwesomeIcon
          icon="dollar-sign"
          className="icon-dollar"
          key={Math.random()}
        />,
        <FontAwesomeIcon
          icon="dollar-sign"
          className="icon-dollar-grey"
          key={Math.random()}
        />,
        <FontAwesomeIcon
          icon="dollar-sign"
          className="icon-dollar-grey"
          key={Math.random()}
        />
      ];
      break;
    case "Moderate":
      dollars = [
        <FontAwesomeIcon
          icon="dollar-sign"
          className="icon-dollar"
          key={Math.random()}
        />,
        <FontAwesomeIcon
          icon="dollar-sign"
          className="icon-dollar"
          key={Math.random()}
        />,
        <FontAwesomeIcon
          icon="dollar-sign"
          className="icon-dollar-grey"
          key={Math.random()}
        />
      ];
      break;
    case "Expensive":
      dollars = [
        <FontAwesomeIcon
          icon="dollar-sign"
          className="icon-dollar"
          key={Math.random()}
        />,
        <FontAwesomeIcon
          icon="dollar-sign"
          className="icon-dollar"
          key={Math.random()}
        />,
        <FontAwesomeIcon
          icon="dollar-sign"
          className="icon-dollar"
          key={Math.random()}
        />
      ];
      break;
    default:
      dollars = [
        <FontAwesomeIcon
          icon="dollar-sign"
          className="icon-dollar-empty"
          key={Math.random()}
        />,
        <FontAwesomeIcon
          icon="dollar-sign"
          className="icon-dollar-empty"
          key={Math.random()}
        />,
        <FontAwesomeIcon
          icon="dollar-sign"
          className="icon-dollar-empty"
          key={Math.random()}
        />
      ];
  }
  return <div className="price">{dollars}</div>;
};

export default PriceRating;
