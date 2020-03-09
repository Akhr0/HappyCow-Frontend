import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import "./Search.css";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import MyMarker from "../../components/Search/MyMarker/MyMarker";
import SearchBox from "../../components/Search/SearchBox/SearchBox";
import ResultList from "../../components/Search/ResultList/ResultList";
import Pagination from "../../components/Basics/Pagination/Pagination";

// SEARCH PAGE ##############################################

const Search = props => {
  //Set variables
  const { search, page } = useParams();
  let pageNum;
  page ? (pageNum = page) : (pageNum = 1);
  const typeStart = {
    vegan: 0,
    vegetarian: 0,
    "veg-options": 0,
    store: 0
  };

  // Creation of states
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(30);
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
            pageNum +
            "&vegan=" +
            type.vegan +
            "&vege=" +
            type.vegetarian +
            "&vo=" +
            type["veg-options"] +
            "&store=" +
            type.store
        );

        // Create Markers declaration func
        const getMarkers = datas => {
          return datas.restaurants.map((resto, index) => {
            return <MyMarker key={Math.random()} resto={resto} />;
          });
        };

        // Create markers launch func
        const marks = await getMarkers(response.data.result);

        // Set all other States
        setSearchResult(response.data.result);
        setIsLoading(false);
        setMarkers(marks);
        setError(false);
      } catch (error) {
        // In case of error from server
        setError(true);
        setIsLoading(false);
        setMarkers([]);
        setSearchResult({
          message: "Nous ne trouvons aucun résultat pour cette recherche"
        });
      }
    };
    fetchData();
  }, [search, type, limit, pageNum]);

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
              setLimit={setLimit}
              currentSearch={search}
            />
            <div className={error ? "d-none" : "d-flex jcc w100 pagination"}>
              <Pagination
                postsPerPage={limit}
                totalPosts={searchResult.count}
                city={search}
                pageNum={pageNum}
              />
            </div>
            <ResultList searchResult={searchResult} error={error} />
            <div className={error ? "d-none" : "d-flex jcc w100 pagination"}>
              <Pagination
                postsPerPage={limit}
                totalPosts={searchResult.count}
                city={search}
                pageNum={pageNum}
              />
            </div>
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
