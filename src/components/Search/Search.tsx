import React from "react";
import { useParams } from "react-router-dom";
import CenteredLoader from "../common/CenteredLoader";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { NoUndefinedVariablesRule } from "graphql";

export default function Search() {
  const { search } = useParams();
  const GET_EPISODES = gql`
    query Episodes($page: Int) {
      episodes(page: $page, filter: { name: "${search}" }) {
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
  const {
    loading: loadingEpisodes,
    error: errorEpisodes,
    data: dataEpisodes,
    fetchMore: fetchMoreEpisodes
  } = useQuery(GET_EPISODES, {
    variables: {
      $pages: 1
    }
  });
  if (dataEpisodes?.episodes?.info?.next) {
    fetchMoreEpisodes({
      variables: {
        page: dataEpisodes.episodes.info.next
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

  const GET_CHARACTERS = gql`
  query Characters($page: Int) {
    characters(page: $page, filter: { name: "${search}" }) {
      info {
        count
        next
      }
      results {
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
  }
`;
  const {
    loading: loadingCharacters,
    error: errorCharacters,
    data: dataCharacters,
    fetchMore: fetchMoreCharacters
  } = useQuery(GET_CHARACTERS, {
    variables: {
      $pages: 1
    }
  });
  if (dataCharacters?.characters?.info?.next) {
    fetchMoreCharacters({
      variables: {
        page: dataCharacters.characters.info.next
      },
      updateQuery: (prev: any, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        const nextObject = {
          characters: {
            ...prev.characters,
            info: fetchMoreResult.characters.info,
            results: [
              ...prev.characters.results,
              ...fetchMoreResult.characters.results
            ]
          }
        };
        return nextObject;
      }
    });
  }

  const GET_LOCATIONS = gql`
  query Locations($page: Int) {
    locations(page: $page, filter: { name: "${search}" }) {
      info {
        count
        next
      }
      results {
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
  }
`;
  const {
    loading: loadingLocations,
    error: errorLocations,
    data: dataLocations,
    fetchMore: fetchMoreLocations
  } = useQuery(GET_LOCATIONS, {
    variables: {
      $pages: 1
    }
  });
  if (dataLocations?.locations?.info?.next) {
    fetchMoreLocations({
      variables: {
        page: dataLocations.locations.info.next
      },
      updateQuery: (prev: any, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        const nextObject = {
          locations: {
            ...prev.locations,
            info: fetchMoreResult.locations.info,
            results: [
              ...prev.locations.results,
              ...fetchMoreResult.locations.results
            ]
          }
        };
        return nextObject;
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
          <h4>Episodes: {dataEpisodes?.episodes?.info?.count}</h4>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around"
            }}
          >
            {dataEpisodes?.episodes?.results
              ? dataEpisodes.episodes.results.map(
                  (episode: any, index: number) => (
                    <a
                      href={`/tarea-5-taller-de-integracion/#/episode/${episode.id}`}
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
                  )
                )
              : "No results found."}
          </div>
        </div>
      )}
      {loadingCharacters ? (
        <CenteredLoader />
      ) : (
        <div>
          <h4>Characters: {dataCharacters?.characters?.info?.count}</h4>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around"
            }}
          >
            {dataCharacters?.characters?.results
              ? dataCharacters.characters.results.map(
                  (character: any, index: number) => (
                    <div
                      style={{
                        margin: 10,
                        width: 200
                      }}
                      key={index}
                    >
                      <a
                        href={`/tarea-5-taller-de-integracion/#/character/${character.id}`}
                        style={{
                          width: "200px",
                          backgroundColor: "#2f9331",
                          display: "block",
                          padding: 10,
                          borderRadius: "0px 10px 0px 0px"
                        }}
                      >
                        {character.name}
                      </a>
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
                          {character.type || "None"} - Gender:{" "}
                          {character.gender}
                        </div>
                        <div>
                          Origin:{" "}
                          {character.origin.name !== "unknown" ? (
                            <a
                              href={`/tarea-5-taller-de-integracion/#/location/${character.origin.id}`}
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
                              href={`/tarea-5-taller-de-integracion/#/location/${character.location.id}`}
                            >
                              {character.location.name}
                            </a>
                          ) : (
                            "unknown"
                          )}
                        </div>
                      </div>
                    </div>
                  )
                )
              : "No results found."}
          </div>
        </div>
      )}
      {loadingLocations ? (
        <CenteredLoader />
      ) : (
        <div>
          <h4>Locations: {dataLocations?.locations?.info?.count}</h4>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around"
            }}
          >
            {dataLocations?.locations?.results
              ? dataLocations.locations.results.map(
                  (location: any, index: number) => (
                    <a
                      href={`/tarea-5-taller-de-integracion/#/location/${location.id}`}
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
                          display: "block",
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
                  )
                )
              : "No results found."}
          </div>
        </div>
      )}
    </div>
  );
}
