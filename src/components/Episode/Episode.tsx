import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CenteredLoader from "../common/CenteredLoader";
import { URL } from "../common/constants";

export default function Episode() {
  const { episode } = useParams();
  const url = `${URL}/episode/${episode}`;
  const [data, setData] = useState({} as any);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(true);
  const [charactersList, setCharactersList] = useState([] as string[]);
  const [charactersListFetched, setCharactersListFetched] = useState(
    [] as any[]
  );
  useEffect(() => {
    fetchInfo(url, data);
    return () => {};
  }, [episode]);

  function fetchInfo(url: string, newData: any) {
    fetch(url)
      .then((response: any) => response.json())
      .then((myJSON: any) => {
        setData(myJSON);
        setCharactersList(myJSON.characters);
        setLoading(false);
      });
  }

  useEffect(() => {
    if (charactersList) {
      Promise.all(charactersList.map((url: string) => fetch(url)))
        .then((responses: any) =>
          Promise.all(responses.map((res: any) => res.json()))
        )
        .then((JSONFiles: any) => {
          setCharactersListFetched(JSONFiles);
          setSearching(false);
        });
    }
  }, [charactersList]);

  function renderContent() {
    if (loading) {
      return <CenteredLoader />;
    }
    if (data.error) {
      return <div>{data.error}</div>;
    }
    return (
      <div>
        <h2 style={{ color: "#477385" }}>Episode</h2>
        <h4>
          {data.name} ({data.episode})
        </h4>
        <div>{data.air_date}</div>
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
            {charactersListFetched.length > 0 &&
              charactersListFetched.map((character: any, index: number) => (
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
                  href={`/#/character/${character.url.split("character/")[1]}`}
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
            {searching && "Searching for results..."}
            {!searching && charactersList.length === 0 && "No results found"}
          </div>
        </div>
      </div>
    );
  }
  return renderContent();
}
