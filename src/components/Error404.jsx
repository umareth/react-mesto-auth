import React from "react";

const styles = {
  errorContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    fontSize: "5rem",
    marginBottom: "1rem",
    color: "#fff",
  },
  description: {
    fontSize: "1.5rem",
    color: "#fff",
  },
};

const Error404 = () => {
  return (
    <div style={styles.errorContainer}>
      <h1 style={styles.header}>404</h1>
      <p style={styles.description}>Page not found</p>
    </div>
  );
};

export default Error404;
