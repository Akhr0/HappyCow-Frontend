import React from "react";
import "./RatingStars.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";

const RatingStars = ({ num }) => {
  let stars = [];
  // RATING STARS
  if (num) {
    for (let i = 0; i < Math.floor(num); i++) {
      stars.push(
        <FontAwesomeIcon
          icon={faStar}
          className="icon-star"
          key={Math.random()}
        />
      );
    }
    if (Math.floor(num) < num) {
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

  return <div className="rating d-flex">{stars}</div>;
};

export default RatingStars;
