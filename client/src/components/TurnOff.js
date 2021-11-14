import { useEffect } from "react";
import { useHistory } from "react-router";
import styles from "./TurnOff.module.css";

export function TurnOffComputer() {
  const history = useHistory();

  function TurnOnComputer() {
    setTimeout(() => {
      history.push("/");
    }, 6000);
  }

  return (
    <div className={styles.container}>
      <button onClick={() => TurnOnComputer()}>PRENDETE ASJAJS</button>
    </div>
  );
}
