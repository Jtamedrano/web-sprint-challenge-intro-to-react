import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardStyle = styled.div`
  flex-basis: 20%;
`;

function CharacterCard({ char }) {
  return (
    <CardStyle className="pokecard">
      <Link to={"/char/" + char.name}>
        <p>{char.name.toUpperCase()}</p>
      </Link>
    </CardStyle>
  );
}

export default CharacterCard;
