import React from "react";
import ReactDOM from "react-dom";
import Draggable from "react-draggable"; // The default
import "98.css";
import Modal from "react-modal";

export const FolderView = ({ folder, setFolder }) => {
  const [count, setCount] = React.useState(0);
  const [highZIndex, setHighZIndex] = React.useState(1);
  const [visible, setVisible] = React.useState(false);
  const [player, setPlayer] = React.useState(false);

  const handleClick = (event) => {
    setHighZIndex(highZIndex + 1);
    event.currentTarget.style.zIndex = highZIndex;
  };

  return (
    <Modal isOpen={folder} onRequestClose={() => setFolder(false)}>
      <Draggable onMouseDown={handleClick}>
        <div
          style={{ position: "relative", width: 300, zIndex: 0 }}
          className="window"
        >
          <div className="title-bar">
            <div className="title-bar-text">Counter Window</div>
            <div className="title-bar-controls">
              <button aria-label="Minimize" />
              <button aria-label="Maximize" />
              <button aria-label="Close" />
            </div>
          </div>

          <div className="window-body">
            <p style={{ textAlign: "center" }}>Current count: {count}</p>
            <div className="field-row" style={{ justifyContent: "center" }}>
              <button onClick={() => setCount(count + 1)}>+</button>
              <button onClick={() => setCount(count - 1)}>-</button>
              <button onClick={() => setCount(0)}>0</button>
            </div>
          </div>
        </div>
      </Draggable>
    </Modal>
  );
};
