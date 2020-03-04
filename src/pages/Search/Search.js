import React, { useState, useEffect } from "react";
import Axios from "axios";
import MiniCardSearch from "../../components/MiniCardSearch/MiniCardSearch";
import { useParams } from "react-router-dom";
import "./Search.css";
import {
  GoogleMap,
  LoadScript,
  Marker,
  OverlayView
} from "@react-google-maps/api";
import MyMarker from "../../components/MyMarker/MyMarker";

const Search = props => {
  const { search, page } = useParams();
  let idPage;

  page ? (idPage = page) : (idPage = 1);

  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [numPage, setNumPage] = useState(idPage);
  const [limit, setLimit] = useState(30);
  const [markers, setMarkers] = useState([1, 2]);

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

      const getMarkers = datas => {
        return datas.restaurants.map((resto, index) => {
          return <MyMarker key={Math.random()} resto={resto} />;
        });
      };

      const marks = await getMarkers(response.data);

      setSearchResult(response.data);
      setIsLoading(false);
      setMarkers(marks);
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
                <li
                  className="mini-card-search d-flex box-sz"
                  key={restaurant._id}
                >
                  <MiniCardSearch {...restaurant} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
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
          zoom={13}
          center={{ lat: 48.8534, lng: 2.3488 }}
        >
          {markers}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Search;
