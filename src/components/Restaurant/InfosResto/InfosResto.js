import React from "react";
import "./InfosResto.css";

const InfosResto = ({ phone, adress, description }) => {
  return (
    <>
      <div className="d-flex fdc infos-resto">
        <h3>About us</h3>
        <p>{description}</p>
      </div>
    </>
  );
};

export default InfosResto;
