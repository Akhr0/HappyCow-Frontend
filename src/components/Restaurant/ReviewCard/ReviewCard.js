import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./ReviewCard.css";

const ReviewCard = ({ title, text, user }) => {
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch datas
    const fetchDatas = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:3400/user/simpleInfo?id=" + user
        );
        setResult(response.data);
        setIsLoading(false);
      } catch (error) {
        setResult({
          message: "Une erreur est survenue"
        });
      }
    };
    fetchDatas();
  }, [user]);
  return (
    <div className="review-card d-flex w100">
      {isLoading ? (
        "Loading"
      ) : (
        <>
          <div className="review-profil">
            <img src={result.avatar} alt="avatar" />
          </div>
          <div className="review">
            <h4>{title}</h4>
            <p>{text}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewCard;
