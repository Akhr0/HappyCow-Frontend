import React, { useState } from "react";
import "./SearchBox.css";
import Button from "../../Basics/Button/Button";
import { useHistory } from "react-router-dom";

const SearchBox = ({ count, city, setType, type, setLimit, currentSearch }) => {
  // Creation variable history
  const history = useHistory();

  // State's search
  const [search, setSearch] = useState("");

  return (
    <div className="search-box w100 d-flex fdc box-sz">
      <span>
        We found {count} results for {city}
      </span>
      <form
        className="w100 box-sz d-flex"
        onSubmit={e => {
          e.preventDefault();
          history.push("/search/" + search + "/1");
        }}
      >
        <input
          type="text"
          value={search}
          className="w100 box-sz"
          onChange={e => {
            setSearch(e.target.value);
          }}
        />
        <input type="submit" className="search-btn" value="Search" />
      </form>
      <div className="d-flex aic">
        <Button
          setType={setType}
          type={type}
          currentType="vegan"
          currentSearch={currentSearch}
        />
        <Button
          setType={setType}
          type={type}
          currentType="vegetarian"
          currentSearch={currentSearch}
        />
        <Button
          setType={setType}
          type={type}
          currentType="veg-options"
          currentSearch={currentSearch}
        />
        <Button
          setType={setType}
          type={type}
          currentType="store"
          currentSearch={currentSearch}
        />
        <select
          id="results-number"
          className="limit out-none"
          onChange={e => {
            setLimit(e.target.value);
            history.push("/search/" + currentSearch + "/1");
          }}
        >
          <option value="30">Résultats / page</option>
          <option value="15">15</option>
          <option value="30">30</option>
          <option value="60">60</option>
        </select>
      </div>
      <hr />
    </div>
  );
};

export default SearchBox;
