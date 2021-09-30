import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.body}>
      <div className={styles.icons}>
        <a href="https://www.linkedin.com/in/federico-chavazza/">
          <img
            src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
            alt="GitHub"
          />
          <div>Linkedin</div>
        </a>
        <a href="https://github.com/FedericoChavazza">
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt="GitHub"
          />
          <div>GitHub</div>
        </a>
        <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=fchavazza@gmail.com&su=Subject&body=Body%20Text">
          <img
            src="https://cdn-icons-png.flaticon.com/512/281/281769.png"
            alt="Gmail"
          />
          <div>Gmail</div>
        </a>
        <Link to="/aboutMe">
          <img
            src="https://win98icons.alexmeub.com/icons/png/notepad-2.png"
            alt="Gmail"
          />
          <div>About me</div>
        </Link>
        <Link to="/portfolio">
          <img
            src="https://win98icons.alexmeub.com/icons/png/display_properties-4.png"
            alt="PortFolio"
          />
          <div>Portfolio</div>
        </Link>
      </div>
      <div className={styles.windows}>
        <button className={styles.init}>INICIO</button>
        <button>
          <img src="https://win98icons.alexmeub.com/icons/png/address_book_user.png" />
        </button>
        <label>HORA</label>
      </div>
    </div>
  );
}
