import { React, useState, useEffect } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    padding: "40px",
    inset: "unset",
    width: "100%",
    maxHeight: "90vh",
    borderRadius: "8px",
    maxWidth: "650px",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "grid",
    placeItems: "center",
    zIndex: "100001",
  },
};

export default function Advertisment({ advertisment, setAdvertisment }) {
  return (
    <div>
      <Modal
        style={customStyles}
        isOpen={advertisment}
        onRequestClose={() => setAdvertisment(false)}
      >
        <button onClick={() => setAdvertisment(false)}>x</button>
        <div>are you sure? :C</div>
        <div>
          <button onClick={() => setAdvertisment(false)}>reject</button>
          <button>accept</button>
        </div>
      </Modal>
    </div>
  );
}
