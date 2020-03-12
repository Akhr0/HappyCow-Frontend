import React from "react";
import "./BlockCardCity.css";

const BlockCardCity = ({ name, picture, history }) => {
  return (
    <div
      className="block-card-city"
      onClick={() => {
        history.push("/search/" + name);
      }}
    >
      <img src={picture} alt={name} />
      <h2>{name}</h2>
    </div>
  );
};

export default BlockCardCity;
