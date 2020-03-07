import React from "react";
import "./ResultList.css";
import MiniCardSearch from "../MiniCardSearch/MiniCardSearch";

const ResultList = ({ error, searchResult }) => {
  const content = error ? (
    <div>{searchResult.message}</div>
  ) : (
    <ul className="list d-flex w100">
      {searchResult.restaurants.map((restaurant, index) => {
        return (
          <li className="mini-card-search d-flex box-sz" key={restaurant._id}>
            <MiniCardSearch {...restaurant} />
          </li>
        );
      })}
    </ul>
  );
  return content;
};

export default ResultList;
