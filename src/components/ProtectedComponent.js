import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

const ProtectedComponent = (props) => {
  return (
    <>
      <Header email={props.email} Signout={props.signout} />
      <Main name="main" {...props} />
      <Footer />
    </>
  );
};

export default ProtectedComponent;
