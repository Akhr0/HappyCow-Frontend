import React, { useState, useEffect } from "react";
import Axios from "axios";
import MiniCardSearch from "../../components/MiniCardSearch/MiniCardSearch";
import { useParams } from "react-router-dom";
import "./Search.css";

const Search = props => {
  const { search, page } = useParams();
  let idPage;

  page ? (idPage = page) : (idPage = 1);

  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [numPage, setNumPage] = useState(idPage);
  const [limit, setLimit] = useState(30);

  useEffect(() => {
    const fetchData = async () => {
      const response = await Axios.get(
        "http://localhost:3400/search?location=" +
          search +
          "&limit=" +
          limit +
          "&page=" +
          numPage
      );

      setSearchResult(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return (
    <div className="search d-flex w100">
      <div className="results">
        {isLoading ? (
          <p>En cours de chargement</p>
        ) : (
          <ul className="list d-flex w100">
            {searchResult.restaurants.map(restaurant => {
              return (
                <li className="mini-card-search d-flex box-sz">
                  <MiniCardSearch {...restaurant} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="map"></div>
    </div>
  );
};

export default Search;
