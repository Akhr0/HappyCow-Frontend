import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Home/Header/Header";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import "./assets/css/reset.css";
import "./assets/css/App.css";
import Restaurant from "./pages/Restaurant/Restaurant";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faDollarSign,
  faAward,
  faMapMarkerAlt,
  faPhoneAlt,
  faClock,
  faHome,
  faHeart
} from "@fortawesome/free-solid-svg-icons";
require("dotenv").config();
library.add(
  faDollarSign,
  faAward,
  faPhoneAlt,
  faMapMarkerAlt,
  faClock,
  faHome,
  faHeart
);

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/restaurant/:restoId">
          <Restaurant />
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
