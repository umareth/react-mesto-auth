import React from "react";
import Header from "./Header";
import Main from "./Main";

const ProtectedComponent = (props) => {
  return (
    <>
      <Header email={props.email} handleLogOut={props.handleLogOut} />
      <Main name="main" {...props} />
    </>
  );
};

export default ProtectedComponent;
