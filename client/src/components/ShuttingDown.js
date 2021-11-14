import styles from "./Start.module.css";

export function ShuttingDown() {
  return (
    <div className={styles.contenedor}>
      <div className={styles.franja}></div>
      <div className={styles.contenido}>
        <div className={styles.infoContenidoApagado}>
          <img src="https://i.imgur.com/ekggMI8.png" alt="" />
          <div>Windows is shutting down...</div>
        </div>
      </div>
      <div className={styles.franja}></div>
    </div>
  );
}
