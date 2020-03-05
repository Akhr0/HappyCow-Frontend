import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import "./assets/css/reset.css";
import "./assets/css/App.css";
import Restaurant from "./pages/Restaurant/Restaurant";
require("dotenv").config();

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
