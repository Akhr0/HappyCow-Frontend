import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Block.css";
import Carousel from "nuka-carousel";
import BlockCardNear from "../BlockCardNear/BlockCardNear";
import { useHistory } from "react-router-dom";

const Block = ({ title, type, cookieAuth, arrIds, height }) => {
  const [resultNear, setResultNear] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [best, setBest] = useState(0);

  const history = useHistory();

  useEffect(() => {
    const funcNear = async (city, premium) => {
      try {
        const response = await Axios.get(
          "http://localhost:3400/search?location=" +
            city +
            "&limit=15&vegan=1&vege=1&vo=1&premium=" +
            premium
        );
        const arr = await funcCreateNearCards(response.data.result.restaurants);
        setResultNear(arr);
        setIsLoading(false);
      } catch (error) {
        setResultNear({
          message: "Une erreur est survenue"
        });
      }
    };

    const funcCreateNearCards = arr => {
      return arr.map((card, index) => {
        return (
          <BlockCardNear
            key={index}
            {...card}
            cookieAuth={cookieAuth}
            arrIds={arrIds}
            history={history}
            best={best}
          />
        );
      });
    };

    const funcCities = () => {
      return null;
    };

    switch (type) {
      case "near":
        funcNear("paris", 1);
        break;
      case "best":
        funcNear("paris", 0);
        setBest(1);
        break;
      case "cities":
        funcCities();
        break;
      default:
        alert("Something wrong happened");
    }
  }, [type, arrIds, cookieAuth, history, best]);

  return (
    <div className="block-home">
      <h2>{title}</h2>
      {isLoading ? null : (
        <Carousel
          width="100%"
          slidesToShow={4}
          transitionMode="scroll"
          renderBottomCenterControls={() => null}
          height={height}
        >
          {resultNear.map(card => {
            return card;
          })}
        </Carousel>
      )}
    </div>
  );
};

export default Block;
