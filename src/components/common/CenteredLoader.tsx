import React from "react";
import Loader from "react-loader-spinner";

export default function CenteredLoader() {
  return (
    <div
      style={{
        position: "absolute",
        top: "calc(50%)",
        left: "calc(50% - 50px)"
      }}
    >
      <Loader color="black" type="BallTriangle" height={100} width={100} />
    </div>
  );
}
