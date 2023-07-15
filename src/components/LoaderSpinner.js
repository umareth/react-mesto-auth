import React from "react";
import infinity from "../images/Infinity.svg";

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function LoaderSpinner() {
  return (
    <div style={containerStyle}>
      <img alt="infinity" src={infinity} />
    </div>
  );
}

export default LoaderSpinner;
