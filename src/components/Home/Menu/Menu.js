import React from "react";
import "./Menu.css";
import Cookies from "js-cookie";

const Menu = ({ setUser, setIsLoading }) => {
  return (
    <div className="menu-list">
      <span>My profile</span>
      <span>Messages</span>
      <span
        onClick={() => {
          Cookies.remove("_Auth");
          setUser(null);
          setIsLoading(true);
        }}
      >
        Logout
      </span>
    </div>
  );
};

export default Menu;
