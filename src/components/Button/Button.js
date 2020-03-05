import React, { useState } from "react";
import "./Button.css";

const Button = ({ currentType, type, setType }) => {
  const [select, setSelect] = useState(false);
  let color;
  let name;
  let picto;

  switch (currentType) {
    case "vegan":
      color = "green";
      name = "Vegan";
      picto = "https://www.happycow.net/img/category/category_vegan.svg";
      break;
    case "vegetarian":
      color = "purple";
      name = "Vegetarian";
      picto = "https://www.happycow.net/img/category/category_vegetarian.svg";
      break;
    case "vegOptions":
      color = "red";
      name = "Veg-Options";
      picto = "https://www.happycow.net/img/category/category_veg-options.svg";
      break;
    case "store":
      color = "brown";
      name = "Store";
      picto = "https://www.happycow.net/img/category/category_health-store.svg";
      break;
    default:
      color = "brown";
      name = "Unknown";
      picto =
        "https://www.labaleine.fr/sites/baleine/files/image-not-found.jpg";
      break;
  }

  return (
    <button
      className={
        select
          ? `Btn d-flex aic jcc Selected
      ${"sbtn-" + color}`
          : "Btn d-flex aic jcc"
      }
      onClick={e => {
        e.preventDefault();
        if (select === false) {
          const obj = {
            vegan: type.vegan,
            vegetarian: type.vegetarian,
            vegOptions: type.vegOptions,
            store: type.store
          };
          obj[currentType] = 1;
          setType(obj);
        } else {
          const obj = {
            vegan: type.vegan,
            vegetarian: type.vegetarian,
            vegOptions: type.vegOptions,
            store: type.store
          };
          obj[currentType] = 0;
          setType(obj);
        }
        setSelect(!select);
      }}
    >
      <img src={picto} alt="picto" />
      <span>{name}</span>
    </button>
  );
};

export default Button;
