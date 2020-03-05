import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import "./Search.css";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import MyMarker from "../../components/MyMarker/MyMarker";
import SearchBox from "../../components/SearchBox/SearchBox";
import ResultList from "../../components/ResultList/ResultList";

// SEARCH PAGE ##############################################

const Search = props => {
  const { search, page } = useParams();
  let idPage;
  const typeStart = {
    vegan: 0,
    vegetarian: 0,
    vegOptions: 0,
    store: 0
  };

  page ? (idPage = page) : (idPage = 1);

  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [numPage] = useState(idPage);
  const [limit] = useState(30);
  const [markers, setMarkers] = useState([]);
  const [type, setType] = useState(typeStart);
  const [error, setError] = useState(false);

  // FETCH DATAS AND CREATE MARKERS ##############
  useEffect(() => {
    // Fetch datas
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:3400/search?location=" +
            search +
            "&limit=" +
            limit +
            "&page=" +
            numPage +
            "&vegan=" +
            type.vegan +
            "&vege=" +
            type.vegetarian +
            "&vo=" +
            type.vegOptions +
            "&store=" +
            type.store
        );

        // Create Markers
        const getMarkers = datas => {
          return datas.restaurants.map((resto, index) => {
            return <MyMarker key={Math.random()} resto={resto} />;
          });
        };

        const marks = await getMarkers(response.data);
        // Set all other States
        setSearchResult(response.data);
        setIsLoading(false);
        setMarkers(marks);
        setError(false);
      } catch (error) {
        setError(true);
        setIsLoading(false);
        setMarkers([]);
        setSearchResult({
          message: "Cette ville ne semble pas référencée sur notre site"
        });
      }
    };
    fetchData();
  }, [search, type, limit, numPage]);

  // DISPLAY ####################################
  return (
    <div className="search d-flex w100">
      <div className="results">
        {isLoading ? (
          <p>En cours de chargement</p>
        ) : (
          <>
            <SearchBox
              count={error ? "0" : searchResult.count}
              city={search}
              setType={setType}
              type={type}
            />
            <ResultList searchResult={searchResult} error={error} />
          </>
        )}
      </div>
      {isLoading ? (
        <p>Map Loading</p>
      ) : (
        <LoadScript
          id="script-loader"
          googleMapsApiKey="AIzaSyDLF83Idktv9zx1_sUyZaB7Pw7znskEiFg"
        >
          <GoogleMap
            id="circle-example"
            mapContainerStyle={{
              height: "calc(100vh - 80px)",
              width: "50%"
            }}
            zoom={error ? 4 : 13}
            center={
              error ? { lat: 54.525961, lng: 15.255119 } : searchResult.coords
            }
          >
            {markers}
          </GoogleMap>
        </LoadScript>
      )}
    </div>
  );
};

export default Search;
