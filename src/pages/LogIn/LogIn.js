import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import Cookies from "js-cookie";
import "./LogIn.css";

const LogIn = ({ setUser, user }) => {
  //History
  let history = useHistory();
  user && history.goBack();

  //Creation of states
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  //Function onSubmit
  const handleSubmit = event => {
    event.preventDefault();
    const sendData = async () => {
      try {
        const response = await Axios.post("http://localhost:3400/user/log_in", {
          email: mail,
          password: password
        });
        if (response.data.token) {
          Cookies.set("_Auth", response.data.token, { expires: 4 });
          setUser(response.data.token);
          history.goBack();
        } else {
          setError(true);
        }
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
            <label htmlFor="mail">Email</label>
            <input
              type="email"
              id="mail"
              value={mail}
              onChange={event => {
                setMail(event.target.value);
              }}
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={event => {
                setPassword(event.target.value);
              }}
            />
            {error ? (
              <span className="error-txt d-flex jcc">
                Wrong email or password, try again.
              </span>
            ) : null}
            <input className="connect" type="submit" value="Connect" />
          </form>
        </div>
        <div className="log-in-card-bot">
          <h3>You haven't an account yet ?</h3>

          <button
            onClick={() => {
              history.push("/signup");
            }}
          >
            Create account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
