import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CenteredLoader from "../common/CenteredLoader";
import { URL } from "../common/constants";

export default function Character() {
  const { character } = useParams();
  const url = `${URL}/character/${character}`;
  const [data, setData] = useState({} as any);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(true);
  const [episodesList, setEpisodesList] = useState([] as string[]);
  const [episodesListFetched, setEpisodesListFetched] = useState([] as any[]);
  useEffect(() => {
    fetchInfo(url, data);
    return () => {};
  }, [character]);

  function fetchInfo(url: string, newData: any) {
    fetch(url)
      .then((response: any) => response.json())
      .then((myJSON: any) => {
        setData(myJSON);
        setEpisodesList(myJSON.episode);
        setLoading(false);
      });
  }

  useEffect(() => {
    if (episodesList) {
      Promise.all(episodesList.map((url: string) => fetch(url)))
        .then((responses: any) =>
          Promise.all(responses.map((res: any) => res.json()))
        )
        .then((JSONFiles: any) => {
          setEpisodesListFetched(JSONFiles);
          setSearching(false);
        });
    }
  }, [episodesList]);

  function renderContent() {
    if (loading) {
      return <CenteredLoader />;
    }
    if (data.error) {
      return <div>{data.error}</div>;
    }
    return (
      <div>
        <h2 style={{ color: "#477385" }}>Character</h2>
        <h4> {data.name}</h4>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            marginTop: 20,
            marginBottom: 20
          }}
        >
          <img src={data.image} alt={data.name} />
          <div>
            <h5>Information</h5>
            <div>
              Specie: {data.species} - Type: {data.type || "None"} - Gender:{" "}
              {data.gender}
            </div>
            <div>
              Origin:{" "}
              {data.origin.name !== "unknown" ? (
                <a
                  href={`/#/location/${data.origin.url.split("location/")[1]}`}
                >
                  {data.origin.name}
                </a>
              ) : (
                "unknown"
              )}
            </div>
            <div>
              Location:{" "}
              {data.location.name !== "unknown" ? (
                <a
                  href={`/#/location/${
                    data.location.url.split("location/")[1]
                  }`}
                >
                  {data.location.name}
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
            {episodesListFetched.length > 0 &&
              episodesListFetched.map((episode: any, index: number) => (
                <a
                  href={`/#/episode/${episode.url.split("episode/")[1]}`}
                  key={index}
                >
                  <div> {episode.name}</div>
                </a>
              ))}
            {searching && "Searching for results..."}
            {!searching && episodesList.length === 0 && "No results found"}
          </div>
        </div>
      </div>
    );
  }
  return renderContent();
}
