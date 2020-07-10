import { EXAMPLE_TYPE } from "../actions/types";

export interface ExampleInfo {
  example: string;
}

export interface ExampleActionInterface {
  type: string;
  payload?: ExampleInfo;
}

export interface ExampleInterface {
  errorFetching: string;
  loading: boolean;
  info?: ExampleInfo;
}

const INITIAL_STATE: ExampleInterface = {
  errorFetching: "",
  loading: false,
  info: undefined
};

const example = (
  state: ExampleInterface = INITIAL_STATE,
  action: ExampleActionInterface
): ExampleInterface => {
  switch (action.type) {
    case EXAMPLE_TYPE:
      return {
        ...state,
        ...INITIAL_STATE,
        info: action.payload
      };
    default:
      return state;
  }
};

export default example;
