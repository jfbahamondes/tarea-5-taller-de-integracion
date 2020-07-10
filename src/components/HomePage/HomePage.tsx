import React, { FunctionComponent, useEffect, useState } from "react";
import CenteredLoader from "../common/CenteredLoader";
import useFetchEffect from "../helpers/useFetch";
import { URL } from "../common/constants";

const HomePage: FunctionComponent = () => {
  const { data, loading } = useFetchEffect(`${URL}/episode`, {
    info: {} as any,
    results: [] as string[]
  });
  return (
    <div>
      <h2 style={{ color: "#477385" }}>HomePage</h2>
      {loading ? (
        <CenteredLoader />
      ) : (
        <div>
          <h4>Episodes: {data.info.count}</h4>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around"
            }}
          >
            {data.results.map((episode: any, index: number) => (
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default HomePage;
