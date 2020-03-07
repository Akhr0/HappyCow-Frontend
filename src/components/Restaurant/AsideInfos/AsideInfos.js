import React from "react";
import "./AsideInfos.css";
import MiniMap from "../MiniMap/MiniMap";
import PriceRating from "../../Basics/PriceRating/PriceRating";

const AsideInfos = ({ price, website, facebook }) => {
  return (
    <div className="aside-infos d-flex fdc">
      <MiniMap />
      <div className="d-flex aic">
        <h5>Price</h5>
        <PriceRating price={price} className="price" />
      </div>
      <div className="d-flex aic">
        <h5>Website : </h5>
        <a href={website}>
          {website
            .replace("http://", "")
            .replace("https://", "")
            .replace("www.", "")}
        </a>
      </div>
      <div className="d-flex aic">
        <h5>Facebook : </h5>
        <a href={facebook}>{facebook.replace("http://facebook.com/", "")}</a>
      </div>
    </div>
  );
};

export default AsideInfos;
