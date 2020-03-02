import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Search from "./components/Search/Search";
import "./assets/css/reset.css";
import "./assets/css/App.css";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
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
