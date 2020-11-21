import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function CharacterPortfolio(props) {
  let { name } = useParams();

  const [pokeData, setPokeData] = useState({});

  useEffect(() => {
    Axios.get("https://pokeapi.co/api/v2/pokemon/" + name)
      .then((res) => {
        setPokeData(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      <Link to="/">
        <h2>Home</h2>
      </Link>
      <h1>{name.toUpperCase()}</h1>
      <p>{pokeData.name}</p>
    </div>
  );
}

export default CharacterPortfolio;
