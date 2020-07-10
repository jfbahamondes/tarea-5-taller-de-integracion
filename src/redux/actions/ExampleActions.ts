import { EXAMPLE_TYPE } from "./types";
import { ExampleActionInterface } from "../reducers/ExampleReducer";
import { Dispatch } from "react";

export const setExampleInfo = () => {
  return (dispatch: Dispatch<ExampleActionInterface>) => {
    dispatch({
      type: EXAMPLE_TYPE,
      payload: { example: "hi" }
    });
  };
};
