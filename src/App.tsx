import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import reducer from "./redux/reducers";
import Main from "./components/Main";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      main: "#00695c",
      light: "#33877c",
      dark: "#004940",
      contrastText: "#fff"
    }
  }
});

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer, {}, applyMiddleware(ReduxThunk))}>
        <MuiThemeProvider theme={theme}>
          <Main />
        </MuiThemeProvider>
      </Provider>
    );
  }
}
