import { React, useState, useEffect } from "react";
import Modal from "react-modal";
import Advertisment from "./Advertisment";
import { Link } from "react-router-dom";

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
    zIndex: "100000",
  },
};

export default function ModalStart() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [question, setQuestion] = useState(false);
  const [advertisment, setAdvertisment] = useState(false);

  useEffect(() => {
    !isModalOpen ? setIsModalOpen(true) : setIsModalOpen(false);
  }, []);

  function modalChecker(e) {
    e.preventDefault();
    if (isModalOpen && question === false) {
      setIsModalOpen(false);
    } else {
      setAdvertisment(true);
    }
  }

  return (
    <div>
      <Modal
        style={customStyles}
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <button
          onClick={() =>
            !question ? setAdvertisment(true) : setIsModalOpen(false)
          }
        >
          X
        </button>

        <header>Welcome to my portfolio!</header>
        <label>Are you sure you wanna continue?</label>
        <label>
          <input name="fede" type="radio" onClick={() => setQuestion(false)} />
          yes
        </label>
        <label>
          <input name="fede" type="radio" onClick={() => setQuestion(true)} />
          no
        </label>
        <div>
          {advertisment && question === true && isModalOpen ? (
            <Link to="/home">
              <button onClick={(e) => modalChecker(e)}>Continue!</button>
            </Link>
          ) : (
            <button onClick={(e) => modalChecker(e)}>Continue!</button>
          )}
        </div>
      </Modal>
      {advertisment ? (
        <Advertisment
          advertisment={advertisment}
          setAdvertisment={setAdvertisment}
        />
      ) : null}
    </div>
  );
}
