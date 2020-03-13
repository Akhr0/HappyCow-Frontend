import React, { useState } from "react";
import "./MiniCardSearch.css";
import { useHistory } from "react-router-dom";
import RatingStars from "../../Basics/RatingStars/RatingStars";
import PriceRating from "../../Basics/PriceRating/PriceRating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";

const MiniCardSearch = ({
  pictures,
  name,
  type,
  rating,
  price,
  _id,
  adress,
  premium,
  cookieAuth,
  arrIds,
  searchResult
}) => {
  //Creation of variables
  let borderStyle;
  let overlayStyle;
  let picto;
  let valueFav;

  if (arrIds) {
    valueFav = arrIds.indexOf(_id) !== -1 ? true : false;
  } else {
    valueFav = false;
  }

  //Creation of states
  const history = useHistory();
  const [favori, setFavori] = useState(valueFav);
  const [label, setLabel] = useState(false);

  const fetchDatas = async (fav, id) => {
    try {
      if (!cookieAuth) {
        return history.push("/login");
      }
      const formData = new FormData();
      formData.append("fav", fav);
      formData.append("id", id);
      await Axios.post(
        "https://happy-cow.herokuapp.com/user/favoris",
        formData,
        {
          headers: {
            Authorization: "Bearer " + cookieAuth
          }
        }
      );
    } catch (error) {
      alert("Une erreur est survenue");
    }
  };

  //Switch for Style
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

  //DISPLAY
  return (
    <div className={borderStyle}>
      <div className={overlayStyle} id={"card" + _id}>
        <div
          className="over-wrapper"
          onClick={() => {
            history.push("/restaurant/" + _id);
          }}
        >
          <img src={picto} alt="picto" />
          <h5>{type}</h5>
          <hr />
          <h4>{name}</h4>
          <p>{adress}</p>
        </div>
      </div>
      {premium === 1 ? (
        <FontAwesomeIcon
          icon="award"
          className="award"
          onMouseOver={() => {
            setLabel(true);
          }}
          onMouseOut={() => {
            setLabel(false);
          }}
        />
      ) : null}
      <div className={label ? "label" : "label-none"}>
        <p>Ce restaurant fait partie de nos précieux partenaires</p>
      </div>
      <FontAwesomeIcon
        icon="heart"
        className={favori ? "heart-selected" : "heart"}
        onClick={e => {
          setFavori(!favori);
          fetchDatas(favori, _id);
        }}
      />
      <img
        src={
          pictures[0]
            ? pictures[0]
            : "https://www.labaleine.fr/sites/baleine/files/image-not-found.jpg"
        }
        alt={name}
      />
      <h2>{name}</h2>
      <RatingStars num={rating} />
      <PriceRating price={price} />
    </div>
  );
};

export default MiniCardSearch;
