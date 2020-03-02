import React from "react";
import "./MiniCardSearch.css";

const MiniCardSearch = ({ pictures, name, type }) => {
  return (
    <div
      className={
        type === "vegan" || type === "Veg Store"
          ? "card green"
          : type === "vegetarian"
          ? "card purple"
          : type === "veg-options"
          ? "card red"
          : "card brown"
      }
    >
      <img src={pictures[0]} alt={name} />
      <h2>{name}</h2>
      <div></div>
    </div>
  );
};

export default MiniCardSearch;
