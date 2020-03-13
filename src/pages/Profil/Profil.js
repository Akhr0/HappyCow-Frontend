import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Profil.css";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SimpleButton from "../../components/Basics/SimpleButton/SimpleButton";

const Profil = ({ user }) => {
  //Condition : you have to be logged to see the profil page
  const history = useHistory();
  !user && history.push("/login");

  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch datas
    const fetchDatas = async () => {
      try {
        const response = await Axios.get(
          "https://happy-cow.herokuapp.com/user/profil",
          {
            headers: {
              Authorization: "Bearer " + user
            }
          }
        );
        setResult(response.data);
        setIsLoading(false);
      } catch (error) {
        setResult({
          message: "Une erreur est survenue"
        });
      }
    };
    if (user) {
      fetchDatas();
    }
  }, [user]);

  return (
    <div className="profil w100 h100 d-flex jcc aic fdc">
      {!isLoading && (
        <>
          <div className="btn-profile">
            <SimpleButton name="Edit Profile" path="/edit" />
          </div>

          <div className="wrapper-top d-flex sbw">
            <div className="first-card">
              <h2>Global Infos</h2>
              <div>
                <FontAwesomeIcon className="icon-profil" icon="user" />
                <span className="ref">Username : </span>
                <span className="res">{result.username}</span>
              </div>
              <div>
                <FontAwesomeIcon className="icon-profil" icon="home" />
                <span className="ref">City : </span>
                <span className="res">{result.account.homeCity}</span>
              </div>
              <div>
                <FontAwesomeIcon className="icon-profil" icon="carrot" />
                <span className="ref">Veg-Status : </span>
                <span className="res">{result.account.vegStatus}</span>
              </div>
              <div>
                <FontAwesomeIcon className="icon-profil" icon="trophy" />
                <span className="ref">Points : </span>
                <span className="res">{result.points}</span>
              </div>
              <div>
                <FontAwesomeIcon className="icon-profil" icon="users" />
                <span className="ref">Followers : </span>
                <span className="res">{result.followed.length}</span>
              </div>
              <div>
                <FontAwesomeIcon className="icon-profil" icon="user-friends" />
                <span className="ref">Following : </span>
                <span className="res">{result.following.length}</span>
              </div>
            </div>
            <div className="second-card d-flex fdc">
              <h2>Avatar</h2>
              <div className="avatar-wrap">
                <img src={result.avatar} alt="avatar" />
                <FontAwesomeIcon className="icon-profil" icon="camera-retro" />
              </div>
            </div>
            <div className="third-card">
              <h2>About Me</h2>
              <div>
                <FontAwesomeIcon className="icon-profil" icon="clock" />
                <span className="ref">Join Date : </span>
                <span className="res">
                  {result.account.joined.slice(0, 10)}
                </span>
              </div>
              <div>
                <FontAwesomeIcon
                  className="icon-profil"
                  icon="pastafarianism"
                />
                <span className="ref">Sign : </span>
                <span className="res">{result.account.starSign}</span>
              </div>
              <div>
                <FontAwesomeIcon className="icon-profil" icon="birthday-cake" />
                <span className="ref">Birth Year : </span>
                <span className="res">{result.account.birthYear}</span>
              </div>
              <div>
                <FontAwesomeIcon className="icon-profil" icon="heart" />
                <span className="ref">Relationship : </span>
                <span className="res">{result.account.relationShip}</span>
              </div>
              <div>
                <FontAwesomeIcon className="icon-profil" icon="praying-hands" />
                <span className="ref">Path : </span>
                <span className="res">{result.account.path}</span>
              </div>
            </div>
          </div>
          <div className="wrapper-bot">
            <div className="fourth-card box-sz">
              <h2>More About Me</h2>
              <div className="d-flex sbw box-z">
                <div className="left d-flex w100 fdc box-sz">
                  <div>
                    <span className="ref">Why i'm veggie : </span>
                    <span className="res">{result.account.reasonsVeg}</span>
                  </div>
                  <div>
                    <span className="ref">Why i like Happy Cow : </span>
                    <span className="res">{result.account.reasonsSite}</span>
                  </div>
                  <div>
                    <span className="ref">My favorite places : </span>
                    <span className="res">{result.account.favPlaces}</span>
                  </div>
                  <div>
                    <span className="ref">My favorite food : </span>
                    <span className="res">{result.account.favFood}</span>
                  </div>
                  <div>
                    <span className="ref">My favorite music : </span>
                    <span className="res">{result.account.favMusic}</span>
                  </div>
                  <div>
                    <span className="ref">My favorite person : </span>
                    <span className="res">{result.account.favPerson}</span>
                  </div>
                  <div>
                    <span className="ref">Veg stuff i like : </span>
                    <span className="res">{result.account.vegStuff}</span>
                  </div>
                </div>
                <div className="description d-flex fdc">
                  <span className="ref">Description : </span>
                  <span className="res">{result.account.description}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profil;
