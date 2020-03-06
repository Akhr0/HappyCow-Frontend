import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Restaurant.css";

const Restaurant = ({ _id }) => {
  const [searchResto, setSearchResto] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // FETCH DATAS
  useEffect(() => {
    // Fetch datas
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:3400/restaurant?id=" + _id
        );

        // Set all other States
        setSearchResto(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setSearchResto({
          message: "Ce restaurant ne semble pas référencé sur notre site"
        });
      }
    };
    fetchData();
  }, [_id]);
  return (
    <div className="restaurant">
      {isLoading ? (
        <p>En cours de chargement</p>
      ) : (
        <>
          <div>{searchResto.name}</div>
        </>
      )}
    </div>
  );
};

export default Restaurant;
