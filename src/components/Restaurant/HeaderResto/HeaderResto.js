import React from "react";
import "./HeaderResto.css";
import RatingStars from "../../Basics/RatingStars/RatingStars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../Basics/Button/Button";

const HeaderResto = ({ name, rating, type, premium, pictures }) => {
  return (
    <nav className="header-resto d-flex jcc w100">
      <div className="wrapper">
        <img src={pictures[0]} alt="header" />
        <div className="black-filter"></div>
        <div className="d-flex fdc header-infos">
          <h2>{name}</h2>
          <div className="d-flex aic">
            {premium === 1 ? (
              <div className="premium d-flex aic">
                <FontAwesomeIcon icon="award" className="icon" />
                <span>FRIEND</span>
              </div>
            ) : null}
            <Button currentType={type} />
            <RatingStars num={rating} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HeaderResto;
