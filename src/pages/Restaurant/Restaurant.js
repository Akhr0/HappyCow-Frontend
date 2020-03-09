import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Restaurant.css";
import { useParams } from "react-router-dom";
import Carousel from "nuka-carousel";
import HeaderResto from "../../components/Restaurant/HeaderResto/HeaderResto";
import InfosResto from "../../components/Restaurant/InfosResto/InfosResto";
import AsideInfos from "../../components/Restaurant/AsideInfos/AsideInfos";

const Restaurant = props => {
  //Creation of states
  const [searchResto, setSearchResto] = useState();
  const [isLoading, setIsLoading] = useState(true);

  //Set restoId
  const { restoId } = useParams();

  // FETCH DATAS
  useEffect(() => {
    // Fetch datas
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:3400/restaurant?id=" + restoId
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
  }, [restoId]);
  return (
    <div className="restaurant d-flex fdc aic w100">
      {isLoading ? (
        <p>En cours de chargement</p>
      ) : (
        <>
          <HeaderResto {...searchResto} />
          <div className="d-flex wrapper box-sz sbw">
            <div className="d-flex fdc box-sz left-side">
              <InfosResto {...searchResto} />
              <Carousel
                width="95%"
                height="240px"
                slidesToShow={3}
                transitionMode="scroll3d"
                wrapAround
                autoplay
                cellSpacing={20}
                pauseOnHover
                renderBottomCenterControls={() => null}
                className="carousel"
              >
                {searchResto.pictures.map((img, index) => {
                  return (
                    <img
                      src={img}
                      className="slide"
                      key={index}
                      alt={"img" + index}
                    />
                  );
                })}
              </Carousel>
            </div>
            <AsideInfos {...searchResto} />
          </div>
        </>
      )}
    </div>
  );
};

export default Restaurant;
