import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Home/Header/Header";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import "./assets/css/reset.css";
import "./assets/css/App.css";
import Restaurant from "./pages/Restaurant/Restaurant";
import SignUp from "./pages/SignUp/SignUp";
import LogIn from "./pages/LogIn/LogIn";
import Cookies from "js-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faDollarSign,
  faAward,
  faMapMarkerAlt,
  faPhoneAlt,
  faClock,
  faHome,
  faHeart,
  faBell,
  faEye
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faDollarSign,
  faAward,
  faPhoneAlt,
  faMapMarkerAlt,
  faClock,
  faHome,
  faHeart,
  faBell,
  faEye
);

function App() {
  let authentication = null;
  const authFromCookie = Cookies.get("_Auth");

  authFromCookie ? (authentication = authFromCookie) : (authentication = null);

  const [user, setUser] = useState(authentication);

  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <Switch>
        <Route exact path="/restaurant/:restoId">
          <Restaurant />
        </Route>
        <Route exact path="/signup">
          <SignUp user={user} />
        </Route>
        <Route exact path="/login">
          <LogIn setUser={setUser} user={user} />
        </Route>
        <Route exact path="/search/:search/:page?">
          <Search />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
