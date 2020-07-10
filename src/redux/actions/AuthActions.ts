import { AUTH_LOGIN_USER } from "./types";

import { Dispatch } from "react";
import { authActionInterface } from "../reducers/AuthReducers";

export const setUser = () => (dispatch: Dispatch<authActionInterface>) => {
  dispatch({ type: AUTH_LOGIN_USER });
};

export const logoutUser = () => {
  return (dispatch: Dispatch<authActionInterface>) => {};
};

export const signInWithGoogle = () => (
  dispatch: Dispatch<authActionInterface>
) => {
  dispatch({ type: AUTH_LOGIN_USER });
};
