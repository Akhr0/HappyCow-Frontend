import React from "react";
import "./Header.css";

const Header = props => {
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
            <span>Add Listing</span>
            <span>Login/Join</span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
