import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Block.css";
import Carousel from "nuka-carousel";

const Block = ({ title, type }) => {
  let data;

  const [resultNear, setResultNear] = useState();

  useEffect(() => {
    const funcNear = async city => {
      try {
        const response = await Axios.get(
          "http://localhost:3400/search?location=" +
            city +
            "&limit=50&vegan=1&vege=1&vo=1&premium=1"
        );
        setResultNear(response.data.result.restaurants);
      } catch (error) {
        setResultNear({
          message: "Une erreur est survenue"
        });
      }
    };

    const funcBest = () => {
      return null;
    };
    const funcCities = () => {
      return null;
    };

    switch (type) {
      case "near":
        data = funcNear("paris");
        break;
      case "best":
        data = funcBest();
        break;
      case "cities":
        data = funcCities();
        break;
      default:
        data = null;
    }
  }, [type]);

  return (
    <div className="block-home">
      <h2>{title}</h2>
      <Carousel
        width="100%"
        height="240px"
        slidesToShow={4}
        transitionMode="scroll"
        cellSpacing={20}
        pauseOnHover
        renderBottomCenterControls={() => null}
        className="carousel"
      >
        <img
          src="https://lh3.googleusercontent.com/proxy/Kwn0wqudr3GaKF5Y718M_3WFf0_CKNAT_TR9RtUxrI3pM899hiDA27VvV-9o4ZEZvNU3caMCHVkzuRvp7hkdPu9e_CFEdjovFpZxh3SeQVsJASFRj24aI1Xv2XE"
          alt="london"
        />
        <img
          src="https://lh3.googleusercontent.com/proxy/Kwn0wqudr3GaKF5Y718M_3WFf0_CKNAT_TR9RtUxrI3pM899hiDA27VvV-9o4ZEZvNU3caMCHVkzuRvp7hkdPu9e_CFEdjovFpZxh3SeQVsJASFRj24aI1Xv2XE"
          alt="london"
        />
        <img
          src="https://lh3.googleusercontent.com/proxy/Kwn0wqudr3GaKF5Y718M_3WFf0_CKNAT_TR9RtUxrI3pM899hiDA27VvV-9o4ZEZvNU3caMCHVkzuRvp7hkdPu9e_CFEdjovFpZxh3SeQVsJASFRj24aI1Xv2XE"
          alt="london"
        />
        <img
          src="https://lh3.googleusercontent.com/proxy/Kwn0wqudr3GaKF5Y718M_3WFf0_CKNAT_TR9RtUxrI3pM899hiDA27VvV-9o4ZEZvNU3caMCHVkzuRvp7hkdPu9e_CFEdjovFpZxh3SeQVsJASFRj24aI1Xv2XE"
          alt="london"
        />
        <img
          src="https://lh3.googleusercontent.com/proxy/Kwn0wqudr3GaKF5Y718M_3WFf0_CKNAT_TR9RtUxrI3pM899hiDA27VvV-9o4ZEZvNU3caMCHVkzuRvp7hkdPu9e_CFEdjovFpZxh3SeQVsJASFRj24aI1Xv2XE"
          alt="london"
        />
      </Carousel>
    </div>
  );
};

export default Block;
