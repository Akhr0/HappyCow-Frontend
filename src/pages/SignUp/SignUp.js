import React, { useState } from "react";
import "./SignUp.css";
import Axios from "axios";
import { useHistory } from "react-router-dom";

const SignUp = ({ user }) => {
  //History
  let history = useHistory();
  user && history.push("/");

  //Creation List of years
  const ageArr = [];
  for (let i = 2020; i >= 1920; i--) {
    ageArr.push(i);
  }

  //Creation states
  const [pseudo, setPseudo] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [vegStatus, setVegStatus] = useState("");
  const [homeCity, setHomeCity] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [message, setMessage] = useState();

  //Function onSubmit
  const handleSubmit = event => {
    event.preventDefault();
    const sendData = async () => {
      try {
        const response = await Axios.post(
          "http://localhost:3400/user/sign_up",
          {
            email: mail,
            username: pseudo,
            password: password,
            homeCity,
            vegStatus,
            birthYear
          }
        );
        console.log(response.data);
        if (response.data.token) {
          setMessage({
            status: true,
            text: "Your account has been created"
          });
          setPseudo("");
          setMail("");
          setPassword("");
          setConfirmPassword("");
          setChecked(false);
          setVegStatus("");
          setHomeCity("");
          setBirthYear("");
        } else {
          setMessage({ status: false, text: response.data.message });
        }
      } catch (error) {
        setMessage({ status: false, text: error.message });
      }
    };

    //Verfication of password regex
    const regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;
    const passwordChecked = regexPassword.test(password);

    //Verification of Username regex
    const regexUsername = /^[\w]{6,16}$/;
    const usernameChecked = regexUsername.test(pseudo);

    if (usernameChecked) {
      if (passwordChecked) {
        if (password === confirmPassword) {
          if (checked) {
            sendData();
          } else {
            setMessage({
              status: false,
              text: "You must accept the General Terms of Use"
            });
          }
        } else {
          setMessage({
            status: false,
            text: "You have to enter the same password"
          });
        }
      } else {
        setMessage({
          status: false,
          text:
            "You must have at least 6 characters in your password including 1 maj, 1 min, 1 num and 1 special char"
        });
      }
    } else {
      setMessage({
        status: false,
        text: "Your username has to contain between 6 and 16 characters"
      });
    }
  };

  return (
    <div className="sign-up">
      <div className="sign-card">
        <div className="sign-card-right">
          <div className="wrapper-title">
            <h3>Create an account</h3>
          </div>

          <form onSubmit={handleSubmit} className="form-sign-up">
            <p>Username *</p>
            <input
              type="text"
              required
              className="field"
              value={pseudo}
              onChange={event => {
                setPseudo(event.target.value);
              }}
            />
            <p>Email *</p>
            <input
              type="email"
              className="field"
              required
              value={mail}
              onChange={event => {
                setMail(event.target.value);
              }}
            />
            <p>Your city *</p>
            <input
              type="text"
              required
              className="field"
              value={homeCity}
              onChange={event => {
                setHomeCity(event.target.value);
              }}
            />
            <select
              id="vegStatus"
              value={vegStatus}
              required
              className="field-select"
              onChange={event => {
                setVegStatus(event.target.value);
              }}
            >
              <option value="">Veg Status *</option>
              <option value="vegan">Vegan</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="raw">Raw</option>
              <option value="mostly-Veg">Mostly-Veg</option>
              <option value="non-veg">Non-veg</option>
              <option value="herbivore">Herbivore</option>
              <option value="fruitarian">Fruitarian</option>
            </select>

            <select
              id="birthYear"
              value={birthYear}
              className="field-select"
              required
              onChange={event => {
                setBirthYear(event.target.value);
              }}
            >
              {" "}
              <option value="">Birth Year *</option>
              {ageArr.map(age => {
                return (
                  <option key={age} value={age}>
                    {age}
                  </option>
                );
              })}
            </select>

            <div className="sign-card-rigth-bot">
              <div>
                <p>Password *</p>
                <input
                  type="password"
                  className="mini-field"
                  required
                  value={password}
                  onChange={event => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
              <div>
                <p>Confirm Password *</p>
                <input
                  type="password"
                  required
                  className="mini-field"
                  value={confirmPassword}
                  onChange={event => {
                    setConfirmPassword(event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="cgv">
              <input
                type="checkbox"
                name="cgv"
                id="cgv-check"
                checked={checked}
                onChange={() => {
                  setChecked(!checked);
                }}
              />
              « I aggree with the <a href="/">General Terms of Use</a> »
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
            <input
              type="submit"
              value="Create my account"
              className="create-btn"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
