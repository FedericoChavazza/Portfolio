import React, { useState } from "react";
import ReactDOM from "react-dom";
import Draggable from "react-draggable"; // The default
import styles from "./FolderView.module.css";
import { closeWindow, minimizedWindow, focusWindow } from "../actions/actions";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";

import Explorer from "./Explorer";
import Notepad from "./Notepad";
import Paint from "./Paint";

export const FolderView = ({
  id,
  windowTitle,
  isFocused,
  kind,
  img,
  isMinimized,
  content,
  isMotoG4,
}) => {
  const dispatch = useDispatch();
  const [position, setPosition] = useState(false);
  const isIpad = window.matchMedia("(max-width: 900px)").matches;

  const [isMaximized, setIsMaximized] = useState(isIpad);

  function globalDelete(e) {
    e.preventDefault();
    // dispatch(deleteData(oneData));
  }

  const handleCloseWindows = () => {
    dispatch(closeWindow(id));
  };

  const handleClick = () => {
    dispatch(focusWindow(id));
  };

  const handleToggleMaximize = (e) => {
    if (isMaximized) {
      setPosition({ x: 100, y: 100 });
      setIsMaximized(false);
    } else {
      setPosition({ x: 0, y: 0 });
      setIsMaximized(true);
    }
  };

  const handleMinimizedWindow = () => {
    dispatch(minimizedWindow(id));
  };

  return (
    <Draggable
      bounds=".bounces"
      handle={`${isIpad ? null : "#windowHead"}`}
      position={position}
      onStop={(_, d) => {
        setPosition({ x: d.lastX, y: d.lastY });
      }}
      defaultPosition={isIpad ? { x: 0, y: 0 } : { x: 100, y: 100 }}
    >
      <div
        className={`${styles.windowView} ${!isFocused && styles.notFocused} ${
          isMinimized && styles.minimized
        } ${isMaximized && styles.maximized}`}
        onClick={handleClick}
        unselectable={false}
      >
        <div id="windowHead" className={styles.windowHead}>
          <div>
            <img style={{ margin: "5px", marginRight: "10px" }} src={img} />
            {windowTitle}
          </div>
          <div
            style={{
              display: "flex",
              gap: "-5px",
            }}
          >
            <div
              onClick={handleMinimizedWindow}
              style={{
                height: "22px",
                width: "22px",
                backgroundColor: "rgba(59,130,246,1)",
                borderRadius: "0.25rem",
                border: "1px solid white",
              }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 12H4"
                ></path>
              </svg>
            </div>
            <div
              onClick={isMotoG4 ? () => {} : handleToggleMaximize}
              style={{
                height: "22px",
                width: "22px",
                backgroundColor: "rgba(59,130,246,1)",
                borderRadius: "0.25rem",
                border: "1px solid white",
                opacity: `${isIpad ? "0.5" : "1"}`,
              }}
            >
              {isMaximized ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  data-v-74cf895c-s=""
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    data-v-74cf895c-s=""
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  data-v-74cf895c-s=""
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  ></path>
                </svg>
              )}
            </div>
            <div
              onClick={handleCloseWindows}
              style={{
                height: "22px",
                width: "22px",
                backgroundColor: "rgba(239,68,68,1)",
                borderRadius: "0.25rem",
                border: "1px solid white",
                "&:hover": {
                  backgroundColor: "rgba(220,38,38,1)",
                },
              }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        {kind !== "paint" && (
          <div className={styles.windowOptions}>
            <div>File</div>
            <div>Contacts</div>
            <div>Actions</div>
            <div>Tools</div>
            <div>Help</div>
          </div>
        )}
        {kind === "explorer" && <Explorer isMotoG4={isMotoG4} />}
        {kind === "notepad" && <Notepad />}
        {kind === "project" && <Notepad content={content} />}
        {kind === "paint" && <Paint />}
      </div>
    </Draggable>
  );
};
