import { React, useState, useEffect } from "react";
import styles from "./Start.module.css";
import { MdOutlineHighlightOff } from "react-icons/md";
import { useHistory } from "react-router";

export function Start() {
  const history = useHistory();

  const [carga, setCarga] = useState(false);

  function cargando() {
    setCarga(true);
    setTimeout(() => {
      history.push("/Deskop");
    }, 1000);
  }

  function apagar() {}

  return (
    <div className={styles.contenedor}>
      <div className={styles.franja}></div>
      <div className={styles.contenido}>
        <div className={styles.infoContenido}>
          <div className={styles.izquierdaContenido}>
            <div className={styles.windows}>
              <img src="https://i.imgur.com/ekggMI8.png" alt="" />
              <p>To begin, click the Demo</p>
            </div>
          </div>
          <div className={styles.derechaContenido}>
            <div className={styles.entrarUsuario} onClick={() => cargando()}>
              <img
                src="https://preview.redd.it/vd7n2wf8oed51.jpg?width=4200&format=pjpg&auto=webp&s=580454b82e63d7446b7204b2d1c743f9572e1b12"
                alt="user img"
              />
              {!carga ? (
                <div>Demo</div>
              ) : (
                <div className={styles.usuario}>
                  <div>Demo</div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "rgba(27, 64, 163, 0.829)",
                    }}
                  >
                    Loading your personal settings...
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.franja}>
        <div className={styles.apagar}>
          <div className={styles.botonEncendido}>
            <MdOutlineHighlightOff size={20} />
          </div>
          <div>Turn Off Computer</div>
        </div>
      </div>
    </div>
  );
}
