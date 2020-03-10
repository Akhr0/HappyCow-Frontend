import React from "react";
import "./BlockCardNear.css";

const BlockCardNear = props => {
  //DISPLAY
  return (
    <div className="block-card-near">
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

export default BlockCardNear;
