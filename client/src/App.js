import "./App.css";
import styles from "./App.module.css";
import Home from "./components/Home";
import { Route } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  return (
    <div className={styles.header}>
      <Route exact path="/" component={Home} />
    </div>
  );
}

export default App;
