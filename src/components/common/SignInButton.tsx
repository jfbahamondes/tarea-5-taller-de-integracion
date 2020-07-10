import React, { Dispatch, FunctionComponent } from "react";
import { signInWithGoogle } from "../../redux/actions/AuthActions";
import { Button } from "@material-ui/core";
import { connect, ConnectedProps } from "react-redux";
import {
  authActionInterface,
  AuthInterface
} from "../../redux/reducers/AuthReducers";

interface actionsType {
  signInWithGoogle: () => (dispatch: Dispatch<authActionInterface>) => void;
}
interface RootState {
  auth: AuthInterface;
}

const actionsReducers: actionsType = { signInWithGoogle };

const mapStateToProps = (state: RootState) => ({
  auth: state.auth
});

const connector = connect(mapStateToProps, actionsReducers);

interface SignInButtonProps {}

type PropsFromRedux = ConnectedProps<typeof connector>;

const SignInButton: FunctionComponent<SignInButtonProps &
  PropsFromRedux> = props => {
  function signInWithGoogle() {
    props.signInWithGoogle();
  }
  return (
    <Button variant="outlined" onClick={signInWithGoogle}>
      <div style={{ overflow: "hidden", marginRight: "5px" }}>
        <div className="logo"></div>
      </div>
      Sign In With Google
    </Button>
  );
};

export default connector(SignInButton);
