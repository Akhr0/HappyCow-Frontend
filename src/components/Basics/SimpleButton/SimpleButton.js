import React from "react";
import "./SimpleButton.css";
import { useHistory } from "react-router-dom";

const SimpleButton = ({ name, path, click }) => {
  const history = useHistory();
  return (
    <button
      className="simple-btn"
      onClick={
        click
          ? click
          : () => {
              history.push(path);
            }
      }
    >
      {name}
    </button>
  );
};

export default SimpleButton;
