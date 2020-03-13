import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Restaurant.css";
import { useParams } from "react-router-dom";
import Carousel from "nuka-carousel";
import HeaderResto from "../../components/Restaurant/HeaderResto/HeaderResto";
import InfosResto from "../../components/Restaurant/InfosResto/InfosResto";
import AsideInfos from "../../components/Restaurant/AsideInfos/AsideInfos";
import ReviewForm from "../../components/Restaurant/ReviewForm/ReviewForm";
import ReviewList from "../../components/Restaurant/ReviewList/ReviewList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BlockInfo from "../../components/Restaurant/BlockInfo/BlockInfo";

const Restaurant = ({ user }) => {
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
          "https://happy-cow.herokuapp.com/restaurant?id=" + restoId
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
              <div className="d-flex">
                <FontAwesomeIcon icon="home" className="icon" />
                <h5>Europe</h5>
              </div>
              <Carousel
                width="100%"
                slidesToShow={3}
                transitionMode="scroll"
                wrapAround
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
              <InfosResto {...searchResto} />
              <ReviewList restoId={restoId} />
              <ReviewForm user={user} restoId={restoId} />
            </div>
            <div className="right-side">
              <AsideInfos {...searchResto} />
              <div className="d-flex fdc right-blocks">
                <BlockInfo
                  title="Open Now"
                  content="10:00 - 22:00"
                  icon="clock"
                />
                <BlockInfo
                  title="Contact"
                  content={searchResto.phone}
                  icon="phone-alt"
                />
                <BlockInfo
                  title="Find"
                  content={searchResto.adress}
                  icon="map-marker-alt"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Restaurant;
