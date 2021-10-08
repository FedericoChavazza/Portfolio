import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import Modal from "react-modal";
import { FolderView } from "./FolderView";
import "98.css";

export default function Home() {
  const [folder, setFolder] = useState(false);
  const [clicks, setClicks] = useState({
    linkedin: 0,
    github: 0,
    gmail: 0,
    aboutme: 0,
    myprojects: 0,
  });
  const [selected, setSelected] = useState("");

  function timesClick(option) {
    if (option === "linkedin") {
      setClicks({
        github: 0,
        gmail: 0,
        aboutme: 0,
        myprojects: 0,
        linkedin: clicks.linkedin + 1,
      });
      if (clicks.linkedin === 1) {
        document.querySelector(`#${option}`).href =
          "https://www.linkedin.com/in/federico-chavazza/";
      }
    }
    if (option === "github") {
      setClicks({
        github: clicks.github + 1,
        gmail: 0,
        aboutme: 0,
        myprojects: 0,
        linkedin: 0,
      });
      if (clicks.github === 1) {
        document.querySelector(`#${option}`).href =
          "https://github.com/FedericoChavazza";
      }
    }
    if (option === "gmail") {
      setClicks({
        github: 0,
        gmail: clicks.gmail + 1,
        aboutme: 0,
        myprojects: 0,
        linkedin: 0,
      });
      if (clicks.gmail === 1) {
        document.querySelector(`#${option}`).href =
          "https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=fchavazza@gmail.com&su=Subject&body=Body%20Text";
      }
    }
    if (option === "aboutme") {
      setClicks({
        github: 0,
        gmail: 0,
        aboutme: clicks.aboutme + 1,
        myprojects: 0,
        linkedin: 0,
      });
      if (clicks.aboutme === 1) {
        setFolder(true);
        setSelected(option);
      }
    }
    if (option === "myprojects") {
      setClicks({
        github: 0,
        gmail: 0,
        aboutme: 0,
        myprojects: clicks.myprojects + 1,
        linkedin: 0,
      });
      if (clicks.myprojects === 1) {
        setFolder(true);
        setSelected(option);
      }
    }
  }

  return (
    <div className={styles.body}>
      <div className={styles.icons}>
        <div onClick={() => timesClick("linkedin")}>
          <a id="linkedin">
            <img
              style={
                clicks.linkedin === 1 ? { opacity: "0.5" } : { opacity: "1" }
              }
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              alt="Linkedin"
            />
            <div
              className={
                clicks.linkedin === 1 ? styles.selected : styles.noSelected
              }
            >
              Linkedin
            </div>
          </a>
        </div>
        <div onClick={() => timesClick("github")}>
          <a id="github">
            <img
              style={
                clicks.github === 1 ? { opacity: "0.5" } : { opacity: "1" }
              }
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="GitHub"
            />
            <div
              className={
                clicks.github === 1 ? styles.selected : styles.noSelected
              }
            >
              GitHub
            </div>
          </a>
        </div>
        <div onClick={() => timesClick("gmail")}>
          <a id="gmail">
            <img
              style={clicks.gmail === 1 ? { opacity: "0.5" } : { opacity: "1" }}
              src="https://cdn-icons-png.flaticon.com/512/281/281769.png"
              alt="Gmail"
            />
            <div
              className={
                clicks.gmail === 1 ? styles.selected : styles.noSelected
              }
            >
              Gmail
            </div>
          </a>
        </div>
        <div onClick={() => timesClick("aboutme")}>
          <img
            style={clicks.aboutme === 1 ? { opacity: "0.5" } : { opacity: "1" }}
            src="https://win98icons.alexmeub.com/icons/png/notepad-2.png"
            alt="TXT"
          />
          <div
            className={
              clicks.aboutme === 1 ? styles.selected : styles.noSelected
            }
          >
            About me
          </div>
        </div>
        <div onClick={() => timesClick("myprojects")}>
          <img
            style={
              clicks.myprojects === 1 ? { opacity: "0.5" } : { opacity: "1" }
            }
            src="https://win98icons.alexmeub.com/icons/png/display_properties-4.png"
            alt="Folder"
          />
          <div
            className={
              clicks.myprojects === 1 ? styles.selected : styles.noSelected
            }
          >
            Projects
          </div>
        </div>
      </div>
      <div className={styles.windows}>
        <button className={styles.init}>INICIO</button>
        <button>
          <img src="https://win98icons.alexmeub.com/icons/png/address_book_user.png" />
        </button>
        <label>HORA</label>
      </div>
      {folder ? (
        <FolderView selected={selected} folder={folder} setFolder={setFolder} />
      ) : null}
    </div>
  );
}
