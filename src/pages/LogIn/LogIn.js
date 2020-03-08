import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import Cookies from "js-cookie";
import "./LogIn.css";

const LogIn = ({ setUser }) => {
  let history = useHistory();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    const sendData = async () => {
      try {
        const response = await Axios.post("http://localhost:3400/user/log_in", {
          email: mail,
          password: password
        });
        Cookies.set("_Auth", response.data.token, { expires: 4 });
        setUser(true);
        history.goBack();
      } catch (error) {
        console.log(error.message);
      }
    };
    sendData();
  };

  return (
    <div className="log-in">
      <div className="log-in-card">
        <div className="log-in-card-top">
          <h3>Connexion</h3>

          <form onSubmit={handleSubmit}>
            <label htmlFor="mail">Adresse email</label>
            <input
              type="email"
              id="mail"
              value={mail}
              onChange={event => {
                setMail(event.target.value);
              }}
            />
            <label htmlFor="password">Mot de Passe</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={event => {
                setPassword(event.target.value);
              }}
            />
            <input className="connect" type="submit" value="Se connecter" />
          </form>
        </div>
        <div className="log-in-card-bot">
          <h3>Vous n'avez pas de compte ?</h3>

          <button
            onClick={() => {
              history.push("/signup");
            }}
          >
            Créer un compte
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
