import React, { useState } from "react";
import "./Button.css";
import { useHistory } from "react-router-dom";

const Button = ({ currentType, type, setType, currentSearch }) => {
  const history = useHistory();
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
    case "veg-options":
      color = "red";
      name = "Veg-Options";
      picto = "https://www.happycow.net/img/category/category_veg-options.svg";
      break;
    default:
      color = "brown";
      name = "Store";
      picto = "https://www.happycow.net/img/category/category_health-store.svg";
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
        if (setType) {
          e.preventDefault();
          if (select === false) {
            const obj = {
              vegan: type.vegan,
              vegetarian: type.vegetarian,
              "veg-options": type["veg-options"],
              store: type.store
            };
            obj[currentType] = 1;
            setType(obj);
            history.push("/search/" + currentSearch + "/1");
          } else {
            const obj = {
              vegan: type.vegan,
              vegetarian: type.vegetarian,
              "veg-options": type["veg-options"],
              store: type.store
            };
            obj[currentType] = 0;
            setType(obj);
            history.push("/search/" + currentSearch + "/1");
          }
          setSelect(!select);
        }
      }}
    >
      <img src={picto} alt="picto" />
      <span>{name}</span>
    </button>
  );
};

export default Button;
