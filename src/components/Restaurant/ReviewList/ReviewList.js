import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./ReviewList.css";
import ReviewCard from "../ReviewCard/ReviewCard";

const ReviewList = ({ restoId }) => {
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch datas
    const fetchDatas = async () => {
      try {
        const response = await Axios.get(
          "https://happy-cow.herokuapp.com/review/restaurant?id=" + restoId
        );
        const arr = await createReviewCards(response.data);
        setResult(arr);
        setIsLoading(false);
      } catch (error) {
        setResult({
          message: "Une erreur est survenue"
        });
      }
    };

    const createReviewCards = arr => {
      return arr.map((review, index) => {
        return <ReviewCard {...review} key={index} />;
      });
    };

    fetchDatas();
  }, [restoId]);
  return (
    <div className="review-list">
      {isLoading ? null : <h4>{result.length + " Reviews"}</h4>}
      {isLoading ? "Reviews are loading" : result}
    </div>
  );
};

export default ReviewList;
