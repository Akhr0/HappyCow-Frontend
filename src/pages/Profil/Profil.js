import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Profil.css";
import { useHistory } from "react-router-dom";

const Profil = ({ user }) => {
  //Condition : you have to be logged to see the profil page
  const history = useHistory();
  !user && history.push("/login");

  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch datas
    const fetchDatas = async () => {
      try {
        const response = await Axios.get("http://localhost:3400/user/profil", {
          headers: {
            Authorization: "Bearer " + user
          }
        });
        setResult(response.data);
        setIsLoading(false);
      } catch (error) {
        setResult({
          message: "Une erreur est survenue"
        });
      }
    };
    if (user) {
      fetchDatas();
    }
  }, [user]);

  return <div>{!isLoading && <p>{result.username}</p>}</div>;
};

export default Profil;
