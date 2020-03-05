import React, { useState } from "react";
import "./SearchBox.css";
import Button from "../Button/Button";
import { useHistory } from "react-router-dom";

const SearchBox = ({ count, city, setType, type }) => {
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
        <input type="submit" className="search-btn" />
      </form>
      <div className="d-flex">
        <Button setType={setType} type={type} currentType="vegan" />
        <Button setType={setType} type={type} currentType="vegetarian" />
        <Button setType={setType} type={type} currentType="vegOptions" />
        <Button setType={setType} type={type} currentType="store" />
      </div>
      <hr />
    </div>
  );
};

export default SearchBox;
