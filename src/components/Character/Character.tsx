import React from "react";
import { useParams } from "react-router-dom";
import CenteredLoader from "../common/CenteredLoader";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

export default function Character() {
  const { character } = useParams();
  const GET_CHARACTER = gql`
{
  character (id: ${character}) {
      id
      name
      status
    species
    type
    gender
    origin{
      id
      name
    }
    location{
      id
      name
    }
    image
    
    episode{
      id
      name
    }
    created
      
  
  }
}
  `;

  const { loading, error, data } = useQuery(GET_CHARACTER);

  function renderContent() {
    if (loading) {
      return <CenteredLoader />;
    }
    if (error) {
      return <div>{error}</div>;
    }
    return (
      <div>
        <h2 style={{ color: "#477385" }}>Character</h2>
        <h4> {data.character.name}</h4>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            marginTop: 20,
            marginBottom: 20
          }}
        >
          <img src={data.character.image} alt={data.character.name} />
          <div>
            <h5>Information</h5>
            <div>
              Specie: {data.character.species} - Type:{" "}
              {data.character.type || "None"} - Gender: {data.character.gender}-
              Status: {data.character.status || ""}
            </div>
            <div>
              Origin:{" "}
              {data.character.origin.name !== "unknown" ? (
                <a href={`/#/location/${data.character.origin.id}`}>
                  {data.character.origin.name}
                </a>
              ) : (
                "unknown"
              )}
            </div>
            <div>
              Location:{" "}
              {data.character.location.name !== "unknown" ? (
                <a href={`/#/location/${data.character.location.id}`}>
                  {data.character.location.name}
                </a>
              ) : (
                "unknown"
              )}
            </div>
          </div>
        </div>
        <div>
          <div>Episodes:</div>
          <div>
            {data.character.episode.length > 0 &&
              data.character.episode.map((episode: any, index: number) => (
                <a href={`/#/episode/${episode.id}`} key={index}>
                  <div> {episode.name}</div>
                </a>
              ))}
          </div>
        </div>
      </div>
    );
  }
  return renderContent();
}
