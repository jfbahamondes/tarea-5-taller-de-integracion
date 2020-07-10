import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CenteredLoader from "../common/CenteredLoader";
import { URL } from "../common/constants";

export default function Search() {
  const { search } = useParams();
  const [loadingEpisodes, setLoadingEpisodes] = useState(true);
  const [loadingCharacters, setLoadingCharacters] = useState(true);
  const [loadingLocations, setLoadingLocations] = useState(true);
  const urlEpisodes = `${URL}/episode/?name=${search}`;
  const urlCharacters = `${URL}/character/?name=${search}`;
  const urlLocations = `${URL}/location/?name=${search}`;
  const [dataEpisodes, setDataEpisodes] = useState({
    info: {} as any,
    results: [] as string[]
  });
  const [dataCharacters, setDataCharacters] = useState({
    info: {} as any,
    results: [] as string[]
  });
  const [dataLocations, setDataLocations] = useState({
    info: {} as any,
    results: [] as string[]
  });

  useEffect(() => {
    fetchInfo(
      urlEpisodes,
      {
        info: {} as any,
        results: [] as string[]
      },
      setDataEpisodes,
      setLoadingEpisodes
    );
    fetchInfo(
      urlCharacters,
      {
        info: {} as any,
        results: [] as string[]
      },
      setDataCharacters,
      setLoadingCharacters
    );
    fetchInfo(
      urlLocations,
      {
        info: {} as any,
        results: [] as string[]
      },
      setDataLocations,
      setLoadingLocations
    );
  }, [search]);

  function fetchInfo(url: string, newData: any, setData: any, setLoading: any) {
    fetch(url)
      .then((response: any) => response.json())
      .then((myJSON: any) => {
        if (myJSON.info) {
          if (myJSON.info.next) {
            fetchInfo(
              myJSON.info.next,
              {
                info: { ...newData.info, ...myJSON.info },
                results: [...newData.results, ...myJSON.results]
              },
              setData,
              setLoading
            );
          } else {
            setData(
              {
                info: { ...newData.info, ...myJSON.info },
                results: [...newData.results, ...myJSON.results]
              },
              setData,
              setLoading
            );
            setLoading(false);
          }
        } else {
          setData(myJSON);
          setLoading(false);
        }
      });
  }

  return (
    <div>
      <h2 style={{ color: "#477385" }}>Search</h2>
      {loadingEpisodes ? (
        <CenteredLoader />
      ) : (
        <div>
          <h4>Episodes: {dataEpisodes?.info?.count}</h4>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around"
            }}
          >
            {dataEpisodes.results
              ? dataEpisodes.results.map((episode: any, index: number) => (
                  <a
                    href={`/#/episode/${episode.url.split("episode/")[1]}`}
                    style={{
                      margin: 10,
                      textDecoration: "none",
                      width: 200
                    }}
                    key={index}
                  >
                    <div
                      style={{
                        backgroundColor: "#2f9331",
                        padding: 10,
                        color: "#111",
                        borderRadius: "0px 10px 0px 0px"
                      }}
                    >
                      {episode.name}
                    </div>
                    <div
                      style={{
                        backgroundColor: "#111",
                        color: "#fff",
                        padding: 10,
                        borderRadius: "0px 0px 10px 10px"
                      }}
                    >
                      <div>Code: {episode.episode}</div>
                      <div>Air Date: {episode.air_date}</div>
                    </div>
                  </a>
                ))
              : "No results found."}
          </div>
        </div>
      )}
      {loadingCharacters ? (
        <CenteredLoader />
      ) : (
        <div>
          <h4>Characters: {dataCharacters?.info?.count}</h4>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around"
            }}
          >
            {dataCharacters.results
              ? dataCharacters.results.map((character: any, index: number) => (
                  <a
                    href={`/#/character/${
                      character.url.split("character/")[1]
                    }`}
                    style={{
                      margin: 10,
                      textDecoration: "none",
                      width: 200
                    }}
                    key={index}
                  >
                    <div
                      style={{
                        backgroundColor: "#2f9331",
                        padding: 10,
                        color: "#111",
                        borderRadius: "0px 10px 0px 0px"
                      }}
                    >
                      {character.name}
                    </div>
                    <div
                      style={{
                        backgroundColor: "#111",
                        color: "#fff",
                        padding: 10,
                        borderRadius: "0px 0px 10px 10px"
                      }}
                    >
                      <div style={{ textAlign: "center" }}>
                        <img
                          src={character.image}
                          alt={character.name}
                          width="90"
                        />
                      </div>
                      <div>
                        Specie: {character.species} - Type:{" "}
                        {character.type || "None"} - Gender: {character.gender}
                      </div>
                      <div>
                        Origin:{" "}
                        {character.origin.name !== "unknown" ? (
                          <a
                            href={`/#/location/${
                              character.origin.url.split("location/")[1]
                            }`}
                          >
                            {character.origin.name}
                          </a>
                        ) : (
                          "unknown"
                        )}
                      </div>
                      <div>
                        Location:{" "}
                        {character.location.name !== "unknown" ? (
                          <a
                            href={`/#/location/${
                              character.location.url.split("location/")[1]
                            }`}
                          >
                            {character.location.name}
                          </a>
                        ) : (
                          "unknown"
                        )}
                      </div>
                    </div>
                  </a>
                ))
              : "No results found."}
          </div>
        </div>
      )}
      {loadingLocations ? (
        <CenteredLoader />
      ) : (
        <div>
          <h4>Locations: {dataLocations?.info?.count}</h4>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around"
            }}
          >
            {dataLocations.results
              ? dataLocations.results.map((location: any, index: number) => (
                  <a
                    href={`/#/location/${location.url.split("location/")[1]}`}
                    style={{
                      margin: 10,
                      textDecoration: "none",
                      width: 200
                    }}
                    key={index}
                  >
                    <div
                      style={{
                        backgroundColor: "#2f9331",
                        padding: 10,
                        color: "#111",
                        borderRadius: "0px 10px 0px 0px"
                      }}
                    >
                      {location.name}
                    </div>
                    <div
                      style={{
                        backgroundColor: "#111",
                        color: "#fff",
                        padding: 10,
                        borderRadius: "0px 0px 10px 10px"
                      }}
                    >
                      <div>Type: {location.type}</div>
                      <div>Dimension: {location.dimension}</div>
                      <div>Residents: {location.residents.length}</div>
                    </div>
                  </a>
                ))
              : "No results found."}
          </div>
        </div>
      )}
    </div>
  );
}
