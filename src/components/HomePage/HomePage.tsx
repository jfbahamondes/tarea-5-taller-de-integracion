import React, { FunctionComponent } from "react";
import CenteredLoader from "../common/CenteredLoader";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const GET_EPISODES = gql`
  query Episodes($page: Int) {
    episodes(page: $page) {
      info {
        count
        next
      }
      results {
        id
        name
        air_date
        episode
        characters {
          id
        }
        created
      }
    }
  }
`;

const HomePage: FunctionComponent = () => {
  const { loading, error, data, fetchMore } = useQuery(GET_EPISODES, {
    variables: {
      $pages: 1
    }
  });
  if (data?.episodes?.info?.next) {
    fetchMore({
      variables: {
        page: data.episodes.info.next
      },
      updateQuery: (prev: any, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        const nextObject = {
          episodes: {
            ...prev.episodes,
            info: fetchMoreResult.episodes.info,
            results: [
              ...prev.episodes.results,
              ...fetchMoreResult.episodes.results
            ]
          }
        };
        return nextObject;
      }
    });
  }
  return (
    <div>
      <h2 style={{ color: "#477385" }}>HomePage</h2>
      {loading ? (
        <CenteredLoader />
      ) : error ? (
        <div>error</div>
      ) : (
        <div>
          <h4>Episodes: {data.episodes.info.count}</h4>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around"
            }}
          >
            {data.episodes.results.map((episode: any, index: number) => (
              <a
                href={`/#/episode/${episode.id}`}
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
