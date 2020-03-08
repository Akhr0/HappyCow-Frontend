import React, { useState, useEffect } from "react";
import "./Header.css";
import Axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

const Header = ({ user, setUser }) => {
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
            src="https://www.happycow.net/img/logo.svg"
            alt="logo"
            className="logo"
          />
          <div>
            {isLoading ? null : <img src={result.avatar} alt="avatar" />}
            {isLoading ? null : <span>Bonjour {result.username}</span>}
            {user ? (
              <button
                onClick={() => {
                  Cookies.remove("_Auth");
                  setUser(null);
                  setIsLoading(true);
                  history.push("/");
                }}
              >
                Se déconnecter
              </button>
            ) : null}
            <span>Add Listing</span>
            <span>Login/Join</span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
