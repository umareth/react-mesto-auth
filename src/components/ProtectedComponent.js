import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

const ProtectedComponent = (props) => {
  return (
    <>
      <Header email={props.email} handleLogOut={props.handleLogOut} />
      <Main name="main" {...props} />
      <Footer />
    </>
  );
};

export default ProtectedComponent;
