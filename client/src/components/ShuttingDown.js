import styles from "./Start.module.css";
import { useSelector } from "react-redux";

export function ShuttingDown() {
  const dataChange = useSelector((state) => state.windowsAction);

  return (
    <div className={styles.contenedor}>
      <div className={styles.franja}></div>
      <div className={styles.contenido}>
        <div className={styles.infoContenidoApagado}>
          <img src="https://i.imgur.com/ekggMI8.png" alt="" />
          <div>Windows is {dataChange}</div>
        </div>
      </div>
      <div className={styles.franja}></div>
    </div>
  );
}
