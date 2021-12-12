import { React, useState, useEffect } from "react";
import styles from "./Start.module.css";
import { MdOutlineHighlightOff } from "react-icons/md";
import { useHistory } from "react-router";
import { ShuttingDown } from "./ShuttingDown";
import { useDispatch, useSelector } from "react-redux";
import { windowActionClose } from "./../actions/actions";
import useSound from "use-sound";
import clickStart from "./../sounds/windows_log_on.mp3";
import startSound from "./../sounds/windows_start_up.mp3";
import shuttingComputer from "./../sounds/windows_shutting_down.mp3";
import { menuCondition, shuttingDownSound } from "./../actions/actions";

export function Start() {
  const history = useHistory();

  const [carga, setCarga] = useState(false);
  const [turnOff, setTurnOff] = useState(false);
  const menuConditionSound = useSelector((state) => state.menuCondition);
  const offSound = useSelector((state) => state.shuttingDown);

  const [clickBegin] = useSound(clickStart);
  const [startRingtone] = useSound(startSound);
  const [soundShuttingDown] = useSound(shuttingComputer);

  const dispatch = useDispatch();

  function cargando() {
    setCarga(true);
    setTimeout(() => {
      history.push("/Deskop");
    }, 1000);
  }

  function apagar() {
    setTurnOff(true);
    dispatch(windowActionClose("shutting down..."));
    dispatch(shuttingDownSound(true));
    setTimeout(() => {
      setTurnOff(false);
      history.push("/turnedOff");
    }, 4000);
  }

  useEffect(() => {
    if (menuConditionSound) {
      startRingtone();

      setTimeout(() => {
        dispatch(menuCondition(false));
      }, 2000);
    }
  });

  useEffect(() => {
    if (offSound) {
      soundShuttingDown();
      dispatch(shuttingDownSound(false));
    }
  }, [offSound]);

  return (
    <div className={styles.contenedor}>
      {!turnOff ? (
        <>
          <div className={styles.franja}></div>
          <div className={styles.contenido}>
            {
              <div className={styles.infoContenido}>
                <div className={styles.izquierdaContenido}>
                  <div className={styles.windows}>
                    <img src="https://i.imgur.com/ekggMI8.png" alt="" />
                    <p>To begin, click the User</p>
                  </div>
                </div>
                <div className={styles.derechaContenido}>
                  <div
                    className={styles.entrarUsuario}
                    onClick={() => {
                      cargando();
                      clickBegin();
                    }}
                  >
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
            }
          </div>
          <div className={styles.franja}>
            <div onClick={() => apagar()} className={styles.apagar}>
              <div className={styles.botonEncendido}>
                <MdOutlineHighlightOff size={20} />
              </div>
              <div>Turn Off Computer</div>
            </div>
          </div>{" "}
        </>
      ) : (
        <ShuttingDown />
      )}
    </div>
  );
}
