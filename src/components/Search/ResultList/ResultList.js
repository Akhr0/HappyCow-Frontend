import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./ResultList.css";
import MiniCardSearch from "../MiniCardSearch/MiniCardSearch";

const ResultList = ({ error, searchResult, cookieAuth }) => {
  const [result, setResult] = useState();
  const [isLoading, setIsLoding] = useState(true);

  useEffect(() => {
    // Fetch datas
    const fetchDatas = async () => {
      try {
        const response = await Axios.get("http://localhost:3400/user/profil", {
          headers: {
            Authorization: "Bearer " + cookieAuth
          }
        });
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
  }, [cookieAuth, searchResult]);

  const content = error ? (
    <div className="d-flex jcc w100 error-msg">{searchResult.message}</div>
  ) : isLoading ? (
    "Loading"
  ) : (
    <ul className="list d-flex w100">
      {searchResult.restaurants.map((restaurant, index) => {
        return (
          <li className="mini-card-search d-flex box-sz" key={restaurant._id}>
            <MiniCardSearch
              {...restaurant}
              cookieAuth={cookieAuth}
              arrIds={result}
              searchResult={searchResult}
            />
          </li>
        );
      })}
    </ul>
  );
  return content;
};

export default ResultList;
