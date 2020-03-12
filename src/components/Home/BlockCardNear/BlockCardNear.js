import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RatingStars from "../../Basics/RatingStars/RatingStars";
import Axios from "axios";
import "./BlockCardNear.css";

const BlockCardNear = ({
  pictures,
  name,
  type,
  rating,
  _id,
  premium,
  cookieAuth,
  arrIds,
  history,
  description,
  best
}) => {
  //Creation of variables
  let picto;
  let valueFav;

  if (arrIds) {
    valueFav = arrIds.indexOf(_id) !== -1 ? true : false;
  } else {
    valueFav = false;
  }

  //Creation of states
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
      await Axios.post("http://localhost:3400/user/favoris", formData, {
        headers: {
          Authorization: "Bearer " + cookieAuth
        }
      });
    } catch (error) {
      alert("Une erreur est survenue");
    }
  };

  //Switch for Picto
  switch (type) {
    case "vegan":
      picto = "https://www.happycow.net/img/category/category_vegan.svg";
      break;
    case "vegetarian":
      picto = "https://www.happycow.net/img/category/category_vegetarian.svg";
      break;
    case "veg-options":
      picto = "https://www.happycow.net/img/category/category_veg-options.svg";
      break;
    default:
      picto = "https://www.happycow.net/img/category/category_health-store.svg";
  }
  //DISPLAY
  return (
    <div className="block-card-near aic d-flex">
      {best === 0 && (
        <FontAwesomeIcon
          icon="heart"
          className={favori ? "heart-selected" : "heart"}
          onClick={e => {
            setFavori(!favori);
            fetchDatas(favori, _id);
          }}
        />
      )}
      <div
        className="d-flex aic fdc w100 out-none"
        onClick={() => {
          history.push("/restaurant/" + _id);
        }}
      >
        {best === 0 ? (
          premium === 1 ? (
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
          ) : null
        ) : null}
        <div className={label ? "label" : "label-none"}>
          <p>Ce restaurant fait partie de nos précieux partenaires</p>
        </div>

        <img
          src={
            pictures[0]
              ? pictures[0]
              : "https://www.labaleine.fr/sites/baleine/files/image-not-found.jpg"
          }
          alt={name}
        />
        <div className="wrap d-flex fdc">
          <div className="title d-flex w100 aic">
            <img src={picto} alt="picto" />
            <h2>{name}</h2>
          </div>

          <RatingStars num={rating} />
          {best === 0 ? <p className="description">{description}</p> : null}
        </div>
      </div>
    </div>
  );
};

export default BlockCardNear;
