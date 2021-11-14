import { useState } from "react";
import { useHistory } from "react-router";
import styles from "./TurnOff.module.css";

import turnOn from "../Images/turnon.png";
import turnOff from "../Images/turnoff.png";

export function TurnOffComputer() {
  const history = useHistory();
  const [isOff, setIsOff] = useState(true);

  function TurnOnComputer() {
    setIsOff(false);

    setTimeout(() => {
      history.push("/");
    }, 6000);
  }

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <img src={isOff ? turnOn : turnOff} onClick={() => TurnOnComputer()} />
      </div>
    </div>
  );
}
