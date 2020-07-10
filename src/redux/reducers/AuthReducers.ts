import {
  AUTH_LOGIN_USER,
  AUTH_LOGIN_USER_FAIL,
  AUTH_LOGIN_USER_SUCCESS,
  AUTH_CREATE_USER,
  AUTH_CREATE_USER_FAIL,
  AUTH_CREATE_USER_SUCCESS,
  AUTH_LOGOUT_USER
} from "../actions/types";

export interface authActionInterface {
  type: string;
}

export interface AuthInterface {
  errorLogging: string;
  errorCreating: string;
  loading: boolean;
}

let INITIAL_STATE: AuthInterface;
INITIAL_STATE = {
  errorLogging: "",
  errorCreating: "",
  loading: false
};

const auth = (
  state: AuthInterface = INITIAL_STATE,
  action: authActionInterface
): AuthInterface => {
  let newState;
  switch (action.type) {
    case AUTH_CREATE_USER:
      newState = {
        ...INITIAL_STATE,
        ...state,
        loading: true
      };
      break;
    case AUTH_CREATE_USER_FAIL:
      newState = {
        ...state,
        errorCreating: "Creation failed! Please check the credentials!",
        loading: false
      };
      break;
    case AUTH_CREATE_USER_SUCCESS:
      newState = {
        ...state,
        loading: false,
        errorCreating: ""
        // user: action.user
      };
      break;
    case AUTH_LOGIN_USER:
      newState = {
        ...INITIAL_STATE,
        ...state,
        loading: true
      };
      break;
    case AUTH_LOGOUT_USER:
      newState = {
        ...state,
        ...INITIAL_STATE,
        loading: false
        // user: null
      };
      break;
    case AUTH_LOGIN_USER_FAIL:
      newState = {
        ...state,
        errorLogging: "Login failed! Please check the credentials!",
        loading: false
      };
      break;
    case AUTH_LOGIN_USER_SUCCESS:
      newState = {
        ...state,
        loading: false,
        errorLogging: ""
        // user: action.user
      };
      break;
    default:
      newState = state;
  }
  return newState;
};

export default auth;
