import React from "react";
import "./MiniCardSearch.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfAlt,
  faDollarSign
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";

const MiniCardSearch = ({
  pictures,
  name,
  type,
  rating,
  price,
  _id,
  adress
}) => {
  let borderStyle;
  let overlayStyle;
  let picto;

  switch (type) {
    case "vegan":
      borderStyle = "card green";
      overlayStyle = "overlay-card ogreen";
      picto = "https://www.happycow.net/img/category/category_vegan.svg";
      break;
    case "vegetarian":
      borderStyle = "card purple";
      overlayStyle = "overlay-card opurple";
      picto = "https://www.happycow.net/img/category/category_vegetarian.svg";
      break;
    case "veg-options":
      borderStyle = "card red";
      overlayStyle = "overlay-card ored";
      picto = "https://www.happycow.net/img/category/category_veg-options.svg";
      break;
    default:
      borderStyle = "card brown";
      overlayStyle = "overlay-card obrown";
      picto = "https://www.happycow.net/img/category/category_health-store.svg";
  }

  // RATING STARS
  let stars = [];
  if (rating) {
    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push(
        <FontAwesomeIcon
          icon={faStar}
          className="icon-star"
          key={Math.random()}
        />
      );
    }
    if (Math.floor(rating) < rating) {
      stars.push(
        <FontAwesomeIcon
          icon={faStarHalfAlt}
          className="icon-star"
          key={Math.random()}
        />
      );
    }
    while (stars.length < 5) {
      stars.push(
        <FontAwesomeIcon
          icon={faStarEmpty}
          className="icon-star"
          key={Math.random()}
        />
      );
    }
  } else {
    while (stars.length < 5) {
      stars.push(
        <FontAwesomeIcon
          icon={faStarEmpty}
          className="icon-star-grey"
          key={Math.random()}
        />
      );
    }
  }

  //PRICE
  let dollars;
  switch (price) {
    case "Inexpensive":
      dollars = [
        <FontAwesomeIcon
          icon={faDollarSign}
          className="icon-dollar"
          key={Math.random()}
        />,
        <FontAwesomeIcon
          icon={faDollarSign}
          className="icon-dollar-grey"
          key={Math.random()}
        />,
        <FontAwesomeIcon
          icon={faDollarSign}
          className="icon-dollar-grey"
          key={Math.random()}
        />
      ];
      break;
    case "Moderate":
      dollars = [
        <FontAwesomeIcon
          icon={faDollarSign}
          className="icon-dollar"
          key={Math.random()}
        />,
        <FontAwesomeIcon
          icon={faDollarSign}
          className="icon-dollar"
          key={Math.random()}
        />,
        <FontAwesomeIcon
          icon={faDollarSign}
          className="icon-dollar-grey"
          key={Math.random()}
        />
      ];
      break;
    case "Expensive":
      dollars = [
        <FontAwesomeIcon
          icon={faDollarSign}
          className="icon-dollar"
          key={Math.random()}
        />,
        <FontAwesomeIcon
          icon={faDollarSign}
          className="icon-dollar"
          key={Math.random()}
        />,
        <FontAwesomeIcon
          icon={faDollarSign}
          className="icon-dollar"
          key={Math.random()}
        />
      ];
      break;
    default:
      dollars = [
        <FontAwesomeIcon
          icon={faDollarSign}
          className="icon-dollar-empty"
          key={Math.random()}
        />,
        <FontAwesomeIcon
          icon={faDollarSign}
          className="icon-dollar-empty"
          key={Math.random()}
        />,
        <FontAwesomeIcon
          icon={faDollarSign}
          className="icon-dollar-empty"
          key={Math.random()}
        />
      ];
  }

  //DISPLAY
  return (
    <div className={borderStyle}>
      <div className={overlayStyle} id={"card" + _id}>
        <div className="over-wrapper">
          <img src={picto} alt="picto" />
          <h5>{type}</h5>
          <hr />
          <h4>{name}</h4>
          <p>{adress}</p>
        </div>
      </div>
      <img
        src={
          pictures[0]
            ? pictures[0]
            : "https://www.labaleine.fr/sites/baleine/files/image-not-found.jpg"
        }
        alt={name}
      />
      <h2>{name}</h2>
      <div className="rating">{stars}</div>
      <div className="price">{dollars}</div>
    </div>
  );
};

export default MiniCardSearch;
