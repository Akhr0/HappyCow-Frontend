import React, { useState } from "react";
import "./Home.css";
import { useHistory } from "react-router-dom";

const Home = props => {
  // Creation variable history
  const history = useHistory();

  // State's search
  const [search, setSearch] = useState("");

  return (
    <main>
      <form
        className="d-flex jcc aic"
        onSubmit={e => {
          e.preventDefault();
          history.push("/search/" + search + "/1");
        }}
      >
        <input
          type="text"
          placeholder="Enter a city"
          value={search}
          className="search-txt br5 out-none box-sz"
          onChange={e => {
            setSearch(e.target.value);
          }}
        />
        <input
          type="submit"
          value="Search"
          className="search-btn br5 out-none box-sz cpoint"
        />
      </form>
    </main>
  );
};

export default Home;
