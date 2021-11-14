import Modal from "react-modal";
import styles from "./CloseByMenu.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { grayscale, windowActionClose } from "../actions/actions";
import { ShuttingDown } from "./ShuttingDown";
import { Redirect, useHistory } from "react-router";
import { turnedOffScreen } from "../actions/actions";

const customStyles = {
  content: {
    position: "unset",
    display: "flex",
    flexDirection: "column",
    width: "316px",
    height: "236px",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: "0",
    padding: "0",
    margin: "0",
    border: "none",
    background: "none",
  },
  overlay: {
    background: "none",
    width: "100vw",
    height: "100vh",
    display: "grid",
    placeItems: "center",
  },
};

export function CloseByMenu({ setTurnOffOption }) {
  const dispatch = useDispatch();

  const [closeComputer, setCloseComputer] = useState(false);
  const history = useHistory();

  function close() {
    setTurnOffOption(false);
    dispatch(grayscale(false));
  }

  function turnOffComputer() {
    dispatch(turnedOffScreen(true));
    dispatch(grayscale(false));
    dispatch(windowActionClose("shutting down..."));
    setTimeout(() => {
      dispatch(turnedOffScreen(false));
      history.push("/turnedOff");
    }, 3000);
  }

  function resetComputer() {
    dispatch(turnedOffScreen(true));
    dispatch(grayscale(false));
    dispatch(windowActionClose("restarting..."));
    setTimeout(() => {
      dispatch(turnedOffScreen(false));
      history.push("/");
    }, 3000);
  }

  return (
    <div>
      <Modal closeTimeoutMS={500} style={customStyles} isOpen={true}>
        <div className={styles.franja1}>
          <div>Turn off computer</div>
          <img src="https://i.imgur.com/OtfzGgx.jpg" alt="" />
        </div>
        <div className={styles.content}>
          {" "}
          <div
            onClick={() => setTurnOffOption(true)}
            className={styles.buttonContainer}
          >
            <div onClick={() => turnOffComputer()} className={styles.columns}>
              <button
                style={{ cursor: "pointer" }}
                className={styles.deleteButton}
              >
                <svg
                  style={{
                    width: "23px",
                    height: "23px",
                  }}
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLineJoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </button>
              Turn Off
            </div>
            <div>
              <div onClick={() => resetComputer()} className={styles.columns}>
                <button
                  style={{ cursor: "pointer" }}
                  className={styles.restartButton}
                >
                  <svg
                    style={{
                      width: "23px",
                      height: "23px",
                      cursor: "pointer",
                    }}
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLineJoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    ></path>
                  </svg>
                </button>
                Restart
              </div>
            </div>
          </div>
        </div>
        <div className={styles.franja2}>
          <button onClick={() => close()}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
}
