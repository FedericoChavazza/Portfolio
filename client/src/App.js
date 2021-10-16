import "./App.css";
import styles from "./App.module.css";
import Home from "./components/Home";
import { Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Start } from "./components/Start";

function App() {
  return (
    <div className={styles.header}>
      <Route exact path="/Deskop" component={Home} />
      <Route exact path="/" component={Start} />
    </div>
  );
}

export default App;
