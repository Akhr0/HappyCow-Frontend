import React, { useState, useEffect } from "react";
import "./Header.css";
import Axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import SimpleButton from "../../Basics/SimpleButton/SimpleButton";
import Logo from "../../../assets/img/logo.svg";

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
        console.log(response.data);
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
          <div className="d-flex aic">
            {isLoading ? null : (
              <p>
                Welcome{" "}
                <span style={{ fontWeight: "bold", color: "green" }}>
                  {result.username}
                </span>
              </p>
            )}
            {isLoading ? null : (
              <img src={result.avatar} alt="avatar" id="avatar" />
            )}

            <SimpleButton name="Add Listing" />
            {user ? (
              <SimpleButton
                name="Disconnect"
                click={() => {
                  Cookies.remove("_Auth");
                  setUser(null);
                  setIsLoading(true);
                }}
              />
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
