import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Home.css";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import HeadImg from "../../assets/img/header.png";

import Block from "../../components/Home/Block/Block";

const Home = props => {
  // Creation variable history
  const history = useHistory();

  // Get cookie
  const cookieAuth = Cookies.get("_Auth");

  // State's search
  const [search, setSearch] = useState("");
  const [result, setResult] = useState();
  const [isLoading, setIsLoding] = useState(true);

  useEffect(() => {
    // Fetch datas
    const fetchDatas = async () => {
      try {
        const response = await Axios.get(
          "https://happy-cow.herokuapp.com/user/profil",
          {
            headers: {
              Authorization: "Bearer " + cookieAuth
            }
          }
        );
        setResult(response.data.favorites);
        setIsLoding(false);
      } catch (error) {
        setResult({
          message: "Une erreur est survenue"
        });
      }
    };
    if (cookieAuth) {
      fetchDatas();
    } else {
      setIsLoding(false);
    }
  }, [cookieAuth]);

  return (
    <main className="d-flex fdc jcc aic w100">
      <img src={HeadImg} alt="header" className="img-home" />
      {/* <div className="black-filter"></div> */}
      <div className="search-nav w100">
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
      </div>
      {isLoading ? null : (
        <div className="wrapper d-flex fdc jcc">
          <Block
            title="Vegan Food Near Me"
            type="near"
            cookieAuth={cookieAuth}
            arrIds={result}
            height="360px"
          />
          <Block
            title="Top Vegan Friendly Cities"
            type="cities"
            cookieAuth={cookieAuth}
            arrIds={result}
            height="370px"
          />
          <Block
            title="10 Best Vegan Restaurants in Paris, France"
            type="best"
            cookieAuth={cookieAuth}
            arrIds={result}
            height="280px"
          />
        </div>
      )}
    </main>
  );
};

export default Home;
