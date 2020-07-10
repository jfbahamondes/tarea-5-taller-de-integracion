import { Route, HashRouter } from "react-router-dom";
import React, { FunctionComponent, useEffect, Dispatch } from "react";
import { connect, ConnectedProps } from "react-redux";
import {
  ExampleInterface,
  ExampleActionInterface
} from "../redux/reducers/ExampleReducer";
import { setExampleInfo } from "../redux/actions/ExampleActions";
import CenteredLoader from "./common/CenteredLoader";
import HomePage from "./HomePage/HomePage";
import Episode from "./Episode/Episode";
import Character from "./Character/Character";
import Place from "./Place/Place";
import SearchBar from "./common/SearchBar";
import Search from "./Search/Search";

interface actionsType {
  setExampleInfo: () => (dispatch: Dispatch<ExampleActionInterface>) => void;
}
interface RootState {
  example: ExampleInterface;
}

const actionsReducers: actionsType = {
  setExampleInfo
};

const mapStateToProps = (state: RootState) => ({
  example: state.example
});

const connector = connect(mapStateToProps, actionsReducers);

type PropsFromRedux = ConnectedProps<typeof connector>;
interface MainProps {}

const Main: FunctionComponent<MainProps & PropsFromRedux> = (
  props: PropsFromRedux
) => {
  useEffect(() => {
    props.setExampleInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function renderContent() {
    if (props.example.loading) {
      return <CenteredLoader />;
    }

    return (
      <HashRouter>
        <div>
          <div style={{ marginBottom: 100 }} className="content">
            <Route exact path="/" component={HomePage} />
            <Route path="/episode/:episode?" component={Episode} />
            <Route path="/character/:character?" component={Character} />
            <Route path="/location/:location?" component={Place} />
            <Route path="/search/:search" component={Search} />
            {/* 
              
              <Route path="/shop" component={Shop} />
              />

              <Route path="/search-game" component={SearchGame} />
              <Route path="/shop" component={Shop} /> */}
          </div>
        </div>
      </HashRouter>
    );
  }
  return (
    <div style={{ margin: 30 }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          marginBottom: 20
        }}
      >
        <h1>
          <a
            href="/#/"
            style={{
              textDecoration: "none",
              color: "#926f44"
            }}
          >
            Rick And Morty Wiki
          </a>
        </h1>
        <SearchBar />
      </div>
      {renderContent()}
    </div>
  );
};

export default connector(Main);
