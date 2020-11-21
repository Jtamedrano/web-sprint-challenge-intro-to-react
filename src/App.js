import Axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import bgImg from "./images/pk-bg.jpg";
import CharacterCard from "./AppComponents/CharacterCard";
import CharacterPortfolio from "./AppComponents/CharacterPortfolio";

const MainAppStyle = styled.div`
  .homeImage {
    width: 100vw;
    height: 100vh;
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1000;
  }

  .container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .pokedex {
      padding: 1em;
      background-color: rgba(255, 255, 255, 0.85);
      width: 80%;
      margin: 0 auto;
      border-radius: 20px;

      .Header {
        width: fit-content;
        padding: 0.25em;
        margin: 0 auto;
        background-color: ${(props) => props.theme.red};
        border-radius: 5px;
      }

      .charList {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
`;

const App = () => {
  const [pokeDex, setPokeDex] = useState([]);
  const [prevApi, setPrevApi] = useState("");
  const [nextApi, setNextApi] = useState("");
  const [totalPokemon, setTotalPokemon] = useState(0);
  const [fullPokeDex, setFullPokeDex] = useState([]);

  useEffect(() => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20`)
      .then((req) => {
        setPokeDex(req.data.results);
        setPrevApi(req.data.previous);
        setNextApi(req.data.next);
        setTotalPokemon(req.data.count);
      })
      .catch((err) => {
        console.warn(err.message);
      });
  }, []);

  useEffect(() => {
    // effect;
    return () => {
      // cleanup;
    };
  }, []);

  console.log(pokeDex);

  return (
    <MainAppStyle className="App">
      <Router>
        <img className="homeImage" src={bgImg} alt="jumbotron" />
        <div className="container">
          <Switch>
            <Route exact path="/char/:name">
              <CharacterPortfolio />
            </Route>

            <Route exact path="/">
              {pokeDex ? <Pokedex pokeDex={pokeDex} /> : <p>Loading</p>}
            </Route>
          </Switch>
        </div>
      </Router>
    </MainAppStyle>
  );
};

function Pokedex({ pokeDex }) {
  return (
    <div className="pokedex">
      <h1 className="Header">Pokedex</h1>
      <section className="charList">
        {pokeDex.map((char) => (
          <CharacterCard char={char} />
        ))}
      </section>
    </div>
  );
}

export default App;
