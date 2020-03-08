import React, { useState } from "react";
import "./SignUp.css";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

const SignUp = ({ user }) => {
  let history = useHistory();
  user && history.push("/");

  const ageArr = [];

  for (let i = 2020; i >= 1920; i--) {
    ageArr.push(i);
  }

  const [pseudo, setPseudo] = useState("Akhro222");
  const [mail, setMail] = useState("nvilleneuve.contact@gmail.com");
  const [password, setPassword] = useState("Fccrazy22!");
  const [confirmPassword, setConfirmPassword] = useState("Fccrazy22!");
  const [checked, setChecked] = useState(true);
  const [vegStatus, setVegStatus] = useState("vegetarian");
  const [homeCity, setHomeCity] = useState("paris");
  const [birthYear, setBirthYear] = useState("1989");

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
        response.data.token
          ? alert("Votre compte a bien été créé")
          : alert(response.data.message);

        setPseudo("");
        setMail("");
        setPassword("");
        setConfirmPassword("");
        setChecked(false);
        setVegStatus("");
        setHomeCity("");
        setBirthYear("");
      } catch (error) {
        alert(error.message);
      }
    };

    if (password.length > 5) {
      if (password === confirmPassword) {
        if (checked) {
          sendData();
        } else {
          alert("Vous devez accepter les conditions");
        }
      } else {
        alert("Vos mots de passe doivent être identiques");
      }
    } else {
      alert("Votre mot de passe doit comporter au moins 6 caractères");
    }
  };
  return (
    <div className="sign-up">
      <div className="sign-card">
        <div className="sign-card-left">
          <h2>Pourquoi créer un compte ?</h2>
          <ul>
            <li>
              <FontAwesomeIcon icon="clock" className="icon-clock" />
              <div>
                <h3>Gagnez du temps</h3>
                <p>
                  Publiez vos annonces rapidement, avec vos informations
                  pré-remplies chaque fois que vous souhaitez déposer une
                  nouvelle annonce.
                </p>
              </div>
            </li>
            <li>
              <FontAwesomeIcon icon="bell" className="icon-bell" />
              <div>
                <h3>Soyez les premiers informés</h3>
                <p>
                  Créez des alertes Immo ou Emploi et ne manquez jamais
                  l’annonce qui vous intéresse.
                </p>
              </div>
            </li>
            <li>
              <FontAwesomeIcon icon="eye" className="icon-eye" />
              <div>
                <h3>Visibilité</h3>
                <p>
                  Suivez les statistiques de vos annonces (nombre de fois où
                  votre annonce a été vue, nombre de contacts reçus).
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className="sign-card-right">
          <div className="wrapper-title">
            <h3>Créer un Compte</h3>
          </div>

          <form onSubmit={handleSubmit} className="form-sign-up">
            <p>Pseudo *</p>
            <input
              type="text"
              className="field"
              value={pseudo}
              onChange={event => {
                setPseudo(event.target.value);
              }}
            />
            <p>Adresse email *</p>
            <input
              type="email"
              className="field"
              value={mail}
              onChange={event => {
                setMail(event.target.value);
              }}
            />
            <p>Ville actuelle *</p>
            <input
              type="text"
              className="field"
              value={homeCity}
              onChange={event => {
                setHomeCity(event.target.value);
              }}
            />
            <select
              id="vegStatus"
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
              className="field-select"
              onChange={event => {
                setBirthYear(event.target.value);
              }}
            >
              {" "}
              <option value="">Année de naissance *</option>
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
                <p>Mot de passe *</p>
                <input
                  type="password"
                  className="mini-field"
                  value={password}
                  onChange={event => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
              <div>
                <p>Confirmer le mot de passe *</p>
                <input
                  type="password"
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
              « J'accepte les <a href="/">Conditions Générales d'Utilisation</a>{" "}
              »
            </div>

            <input
              type="submit"
              value="Créer mon Compte Personnel"
              className="create-btn"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
