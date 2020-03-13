import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import "./Edit.css";

const Edit = ({ user }) => {
  //Condition : you have to be logged to see the profil page
  const history = useHistory();
  !user && history.push("/login");

  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState();
  const [homeCity, setHomeCity] = useState();
  const [description, setDescription] = useState();
  const [reasonsVeg, setReasonsVeg] = useState();
  const [reasonsSite, setReasonsSite] = useState();
  const [favPlaces, setFavPlaces] = useState();
  const [favPerson, setFavPerson] = useState();
  const [favMusic, setFavMusic] = useState();
  const [vegStuff, setVegStuff] = useState();
  const [path, setPath] = useState();
  const [relationShip, setRelationShip] = useState();
  const [starSign, setStarSign] = useState();
  const [vegStatus, setVegStatus] = useState();
  const [email, setEmail] = useState();

  //Function onSubmit
  const handleSubmit = event => {
    event.preventDefault();
    const sendData = async () => {
      try {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("homeCity", homeCity);
        formData.append("description", description);
        formData.append("reasonsVeg", reasonsVeg);
        formData.append("reasonsSite", reasonsSite);
        formData.append("favPlaces", favPlaces);
        formData.append("favPerson", favPerson);
        formData.append("favMusic", favMusic);
        formData.append("vegStuff", vegStuff);
        formData.append("path", path);
        formData.append("relationShip", relationShip);
        formData.append("starSign", starSign);
        formData.append("vegStatus", vegStatus);
        formData.append("email", email);

        const response = await Axios.post(
          "https://happy-cow.herokuapp.com/user/update",
          formData,
          {
            headers: {
              Authorization: "Bearer " + user
            }
          }
        );
        console.log(response.data);
        if (response.data.token) {
          setMessage({
            status: true,
            text: "Your account has been updated"
          });
        } else {
          setMessage({ status: false, text: response.data.message });
        }
      } catch (error) {
        setMessage({ status: false, text: error.message });
      }
    };

    //Verification of Username regex
    const regexUsername = /^[\w]{6,16}$/;
    const usernameChecked = regexUsername.test(username);

    if (usernameChecked) {
      sendData();
    } else {
      setMessage({
        status: false,
        text: "Your username has to contain between 6 and 16 characters"
      });
    }
  };

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
        const r = response.data;

        setUsername(r.username);
        setEmail(r.email);
        setVegStatus(r.account.vegStatus);
        setHomeCity(r.account.homeCity);
        setDescription(r.account.description);
        setReasonsVeg(r.account.reasonsVeg);
        setReasonsSite(r.account.reasonsSite);
        setFavPlaces(r.account.favPlaces);
        setFavPerson(r.account.favPerson);
        setFavMusic(r.account.favMusic);
        setVegStuff(r.account.vegStuff);
        setPath(r.account.path);
        setRelationShip(r.account.relationShip);
        setStarSign(r.account.starSign);

        setIsLoading(false);
      } catch (error) {
        setMessage({
          status: false,
          text: "An error occured with our server"
        });
      }
    };
    if (user) {
      fetchDatas();
    }
  }, [user]);

  return (
    <div className="edit d-flex jcc w100 h100">
      <div className="edit-card">
        {isLoading ? (
          "Loading"
        ) : (
          <>
            <div className="lign">
              <span className="ref">Username :</span>
              <input
                type="text"
                value={username}
                required
                className="res"
                onChange={e => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="lign">
              <span className="ref">Email :</span>
              <input
                type="email"
                value={email}
                required
                className="res"
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="lign">
              <span className="ref">Veg-Status :</span>
              <select
                value={vegStatus}
                className="res"
                onChange={e => {
                  setVegStatus(e.target.value);
                }}
              >
                <option value="vegan">Vegan</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="mostly-veg">Mostly-Veg</option>
                <option value="fruitarian">Fruitarian</option>
                <option value="herbivore">Herbivore</option>
              </select>
            </div>
            <div className="lign">
              <span className="ref">Star Sign :</span>
              <select
                value={starSign}
                className="res"
                onChange={e => {
                  setStarSign(e.target.value);
                }}
              >
                <option value="aries">Aries</option>
                <option value="taurus">Taurus</option>
                <option value="gemini">Gemini</option>
                <option value="cancer">Cancer</option>
                <option value="leo">Leo</option>
                <option value="virgo">Virgo</option>
                <option value="libra">Libra</option>
                <option value="scorpio">Scorpio</option>
                <option value="sagittarius">Sagittarius</option>
                <option value="capricorn">Capricorn</option>
                <option value="aquarius">Aquarius</option>
                <option value="pisces">Pisces</option>
              </select>
            </div>
            <div className="lign">
              <span className="ref">City :</span>
              <input
                type="text"
                value={homeCity}
                className="res"
                onChange={e => {
                  setHomeCity(e.target.value);
                }}
              />
            </div>
            <div className="lign">
              <span className="ref">Description :</span>
              <textarea
                type="text"
                value={description}
                className="res"
                onChange={e => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div className="lign">
              <span className="ref">Why i'm veggie :</span>
              <input
                type="text"
                value={reasonsVeg}
                className="res"
                onChange={e => {
                  setReasonsVeg(e.target.value);
                }}
              />
            </div>
            <div className="lign">
              <span className="ref">Why i like Happy Cow :</span>
              <input
                type="text"
                value={reasonsSite}
                className="res"
                onChange={e => {
                  setReasonsSite(e.target.value);
                }}
              />
            </div>
            <div className="lign">
              <span className="ref">Favorite Places :</span>
              <textarea
                value={favPlaces}
                className="res"
                onChange={e => {
                  setFavPlaces(e.target.value);
                }}
              />
            </div>
            <div className="lign">
              <span className="ref">Favorite Music :</span>
              <textarea
                value={favMusic}
                className="res"
                onChange={e => {
                  setFavMusic(e.target.value);
                }}
              />
            </div>
            <div className="lign">
              <span className="ref">Favorite Person :</span>
              <textarea
                value={favPerson}
                className="res"
                onChange={e => {
                  setFavPerson(e.target.value);
                }}
              />
            </div>
            <div className="lign">
              <span className="ref">My Veg Stuff :</span>
              <textarea
                type="text"
                value={vegStuff}
                className="res"
                onChange={e => {
                  setVegStuff(e.target.value);
                }}
              />
            </div>
            <div className="lign">
              <span className="ref">Path :</span>
              <input
                type="text"
                value={path}
                className="res"
                onChange={e => {
                  setPath(e.target.value);
                }}
              />
            </div>
            <div className="lign">
              <span className="ref">Relationship :</span>
              <input
                type="text"
                value={relationShip}
                className="res"
                onChange={e => {
                  setRelationShip(e.target.value);
                }}
              />
            </div>
            {message && (
              <div
                className={
                  message.status === true
                    ? "good-txt d-flex jcc w100"
                    : "wrong-txt d-flex jcc w100"
                }
              >
                {message.text}
              </div>
            )}
            <button onClick={handleSubmit}>Update my Profile</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Edit;
