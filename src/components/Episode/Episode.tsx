import React from "react";
import { useParams } from "react-router-dom";
import CenteredLoader from "../common/CenteredLoader";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

export default function Episode() {
  const { episode } = useParams();
  const GET_EPISODE = gql`
    {
      episode(id: ${episode}) {
        id
        name
        air_date
        episode
        characters {
          id
          image
          name
        }
        created
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_EPISODE);

  function renderContent() {
    if (loading) {
      return <CenteredLoader />;
    }
    if (error) {
      return <div>Error</div>;
    }
    console.log("data", data);
    return (
      <div>
        <h2 style={{ color: "#477385" }}>Episode</h2>
        <h4>
          {data.episode.name} ({data.episode.episode})
        </h4>
        <div>{data.episode.air_date}</div>
        <div
          style={{
            marginTop: 10,
            padding: 10
          }}
        >
          <h5>Characters:</h5>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around"
            }}
          >
            {data.episode.characters.length > 0 &&
              data.episode.characters.map((character: any, index: number) => (
                <a
                  style={{
                    padding: 10,
                    margin: 10,
                    width: 200,
                    textAlign: "center",
                    backgroundColor: "#111",
                    borderRadius: 10,
                    color: "#fff"
                  }}
                  href={`/#/character/${character.id}`}
                  key={index}
                >
                  <img
                    src={character.image}
                    alt={character.name}
                    height="100"
                  />
                  <div> {character.name}</div>
                </a>
              ))}
          </div>
        </div>
      </div>
    );
  }
  return renderContent();
}
