import React from "react";
import { useParams } from "react-router-dom";
import CenteredLoader from "../common/CenteredLoader";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

export default function Place() {
  const { location } = useParams();
  const GET_LOCATION = gql`
    {
  location  (id: ${location}) {
      id
      name
    type
    dimension
    residents{
      id
      name
      image
    }
    created
  }
}
  `;

  const { loading, error, data } = useQuery(GET_LOCATION);

  function renderContent() {
    if (loading) {
      return <CenteredLoader />;
    }
    if (error) {
      return <div>{error}</div>;
    }
    return (
      <div>
        <h2 style={{ color: "#477385" }}>Location</h2>
        <h4>{data.location.name}</h4>
        <div>Type: {data.location.type}</div>
        <div>Dimension: {data.location.dimension}</div>
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
            {data.location.residents.length > 0 &&
              data.location.residents.map((character: any, index: number) => (
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
