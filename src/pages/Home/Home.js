import React, { useState } from "react";
import "./Home.css";
import { useHistory } from "react-router-dom";

import Block from "../../components/Home/Block/Block";

const Home = props => {
  // Creation variable history
  const history = useHistory();

  // State's search
  const [search, setSearch] = useState("");

  return (
    <main className="d-flex fdc jcc aic w100">
      <div className="wave-container w100">
        <h1>Find Vegan Restaurants Nearby</h1>
        <form
          className="d-flex jcc aic"
          onSubmit={e => {
            e.preventDefault();
            history.push("/search/" + search + "/1");
          }}
        >
          <input
            type="text"
            placeholder="Search for city"
            value={search}
            className="search-txt out-none box-sz"
            onChange={e => {
              setSearch(e.target.value);
            }}
          />
          <input
            type="submit"
            value="Search"
            className="search-btn out-none box-sz cpoint"
          />
        </form>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#008000"
            fillOpacity="1"
            d="M0,288L80,288C160,288,320,288,480,261.3C640,235,800,181,960,165.3C1120,149,1280,171,1360,181.3L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
      </div>
      <div className="wrapper d-flex fdc jcc">
        <Block title="Vegan Food Near Me" type="near" />
        <Block title="10 Best Vegan Restaurants in Paris, France" type="best" />
        <Block title="Top Vegan Friendly Cities" type="cities" />
      </div>
    </main>
  );
};

export default Home;
