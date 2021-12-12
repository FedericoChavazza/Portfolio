import { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import styles from "./TurnOff.module.css";

import turnOn from "../Images/turnon.png";
import turnOff from "../Images/turnoff.png";
import { menuCondition, shuttingDownSound } from "../actions/actions";
import useSound from "use-sound";
import computerOn from "./../sounds/computer_turn_on.mp3";

export function TurnOffComputer() {
  const history = useHistory();
  const [isOff, setIsOff] = useState(true);
  const [computerSound] = useSound(computerOn);
  const dispatch = useDispatch();

  function TurnOnComputer() {
    computerSound();
    setIsOff(false);
    dispatch(shuttingDownSound(false));
    setTimeout(() => {
      dispatch(menuCondition(true));
      history.push("/");
    }, 8000);
  }

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <img src={isOff ? turnOn : turnOff} onClick={() => TurnOnComputer()} />
      </div>
    </div>
  );
}
