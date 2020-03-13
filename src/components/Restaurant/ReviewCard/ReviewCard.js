import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./ReviewCard.css";
import VegStatus from "../../Restaurant/VegStatus/VegStatus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ReviewCard = ({ title, text, user }) => {
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch datas
    const fetchDatas = async () => {
      try {
        const response = await Axios.get(
          "https://happy-cow.herokuapp.com/user/simpleInfo?id=" + user
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
          <div className="review-profil d-flex fdc aic">
            <img src={result.avatar} alt="avatar" />
            <div className="d-flex aic">
              <span>{result.username}</span>
              <FontAwesomeIcon icon="envelope" className="icon-msg" />
            </div>
            <p>
              <span>Points : </span>
              {result.points}
            </p>
            <VegStatus type={result.type} />
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
