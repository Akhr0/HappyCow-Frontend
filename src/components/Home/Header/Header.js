import React, { useState, useEffect } from "react";
import "./Header.css";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import SimpleButton from "../../Basics/SimpleButton/SimpleButton";
import Logo from "../../../assets/img/logo.svg";
import IconClickable from "../../Basics/IconClickable/IconClickable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

const Header = ({ user, setUser }) => {
  //Creation of states
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch datas
    const fetchDatas = async () => {
      try {
        const response = await Axios.get("http://localhost:3400/user/infos", {
          headers: {
            Authorization: "Bearer " + user
          }
        });
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

  const history = useHistory();
  return (
    <header className="w100">
      <nav className="w100 h100 box-sz">
        <div className="wrapper d-flex aic sbw h100">
          <img
            src={Logo}
            alt="logo"
            className="logo"
            onClick={() => {
              history.push("/");
            }}
          />
          <div className="d-flex aic h100">
            <SimpleButton name="Add Listing" />
            {isLoading ? null : (
              <img src={result.avatar} alt="avatar" id="avatar" />
            )}
            {isLoading ? null : (
              <div className="wrap-account h100 d-flex aic">
                <span className="account">
                  {result.username}
                  <FontAwesomeIcon
                    icon="chevron-down"
                    className="icon-chevron"
                  />
                  <div className="menu-list">
                    <span>My profile</span>
                    <span>Messages</span>
                    <span
                      onClick={() => {
                        Cookies.remove("_Auth");
                        setUser(null);
                        setIsLoading(true);
                      }}
                    >
                      Logout
                    </span>
                  </div>
                </span>
              </div>
            )}

            {user ? (
              <>
                <IconClickable
                  icon="envelope"
                  path="/messages"
                  color="green"
                  size="2.5"
                />
                <IconClickable icon="bell" color="green" size="2.5" />
              </>
            ) : (
              <SimpleButton name="Login / Join" path="/login" />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
