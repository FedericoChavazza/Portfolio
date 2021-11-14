import "./App.css";
import styles from "./App.module.css";
import Home from "./components/Home";
import { Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Start } from "./components/Start";
import { useDispatch, useSelector } from "react-redux";
import { TurnOffComputer } from "./components/TurnOff";

// import clickSound from "/click.mp3";

function App() {
  const grayscale = useSelector((state) => state.grayscale);

  const onClick = () => {
    console.log("CLICK!!!");
    const audio = new Audio("/click.mp3");

    console.log(audio);

    audio.play();
  };

  return (
    <div
      onClick={onClick}
      className={!grayscale ? styles.header : styles.grayHeader}
    >
      <Route exact path="/Deskop" component={Home} />
      <Route exact path="/" component={Start} />
      <Route exact path="/turnedOff" component={TurnOffComputer} />
    </div>
  );
}

export default App;
