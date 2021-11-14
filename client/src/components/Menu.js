import { useState } from "react";
import { useHistory } from "react-router";
import styles from "./Menu.module.css";
import { CloseByMenu } from "./CloseByMenu";
import { useDispatch, useSelector } from "react-redux";
import { grayscale } from "../actions/actions";
import { openWindow } from "../actions/actions";

// ⣇⣿⠘⣿⣿⣿⡿⡿⣟⣟⢟⢟⢝⠵⡝⣿⡿⢂⣼⣿⣷⣌⠩⡫⡻⣝⠹⢿⣿⣷
// ⡆⣿⣆⠱⣝⡵⣝⢅⠙⣿⢕⢕⢕⢕⢝⣥⢒⠅⣿⣿⣿⡿⣳⣌⠪⡪⣡⢑⢝⣇
// ⡆⣿⣿⣦⠹⣳⣳⣕⢅⠈⢗⢕⢕⢕⢕⢕⢈⢆⠟⠋⠉⠁⠉⠉⠁⠈⠼⢐⢕⢽
// ⡗⢰⣶⣶⣦⣝⢝⢕⢕⠅⡆⢕⢕⢕⢕⢕⣴⠏⣠⡶⠛⡉⡉⡛⢶⣦⡀⠐⣕⢕
// ⡝⡄⢻⢟⣿⣿⣷⣕⣕⣅⣿⣔⣕⣵⣵⣿⣿⢠⣿⢠⣮⡈⣌⠨⠅⠹⣷⡀⢱⢕
// ⡝⡵⠟⠈⢀⣀⣀⡀⠉⢿⣿⣿⣿⣿⣿⣿⣿⣼⣿⢈⡋⠴⢿⡟⣡⡇⣿⡇⡀⢕
// ⡝⠁⣠⣾⠟⡉⡉⡉⠻⣦⣻⣿⣿⣿⣿⣿⣿⣿⣿⣧⠸⣿⣦⣥⣿⡇⡿⣰⢗⢄
// ⠁⢰⣿⡏⣴⣌⠈⣌⠡⠈⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣬⣉⣉⣁⣄⢖⢕⢕⢕
// ⡀⢻⣿⡇⢙⠁⠴⢿⡟⣡⡆⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣵⣵⣿
// ⡻⣄⣻⣿⣌⠘⢿⣷⣥⣿⠇⣿⣿⣿⣿⣿⣿⠛⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣷⢄⠻⣿⣟⠿⠦⠍⠉⣡⣾⣿⣿⣿⣿⣿⣿⢸⣿⣦⠙⣿⣿⣿⣿⣿⣿⣿⣿⠟
// ⡕⡑⣑⣈⣻⢗⢟⢞⢝⣻⣿⣿⣿⣿⣿⣿⣿⠸⣿⠿⠃⣿⣿⣿⣿⣿⣿⡿⠁⣠
// ⡝⡵⡈⢟⢕⢕⢕⢕⣵⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣿⣿⣿⣿⣿⠿⠋⣀⣈⠙
// ⡝⡵⡕⡀⠑⠳⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⢉⡠⡲⡫⡪⡪⡣

export function Menu({ openMenu, setOpenMenu }) {
  const history = useHistory();

  const dispatch = useDispatch();
  const closedState = useSelector((state) => state.turnedOffComputer);

  function returnStart(e) {
    e.preventDefault();
    history.push("/");
    console.log("me tocaron aca");
  }

  const [closeComputer, setCloseComputer] = useState(false);
  const [turnOffOption, setTurnOffOption] = useState(false);

  if (turnOffOption) {
    dispatch(grayscale(true));
  }

  return (
    <div
      id="menu"
      className={!turnOffOption ? styles.showMenu : styles.notShowMenu}
    >
      <header className={styles.top}>
        <img src="https://preview.redd.it/vd7n2wf8oed51.jpg?width=4200&format=pjpg&auto=webp&s=580454b82e63d7446b7204b2d1c743f9572e1b12" />
        <div>Demo</div>
      </header>
      <div className={styles.content}>
        <div className={styles.column1}>
          {ICONS.map((icon) => (
            <Icon key={icon.id} setOpenMenu={setOpenMenu} {...icon} />
          ))}
        </div>
        <div className={styles.column2}></div>
      </div>
      <footer className={styles.footer}>
        <div className={styles.buttonContainer} onClick={(e) => returnStart(e)}>
          <button>
            <svg
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
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              ></path>
            </svg>
          </button>
          Log off
        </div>
        <div
          onClick={() => setTurnOffOption(true)}
          className={styles.buttonContainer}
        >
          <button>
            <svg
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
          Turn off computer
        </div>
      </footer>
      {turnOffOption ? (
        <CloseByMenu
          closeComputer={closeComputer}
          setCloseComputer={setCloseComputer}
          setTurnOffOption={setTurnOffOption}
          onOpen={turnOffOption}
          onClose={() => setTurnOffOption(false)}
        />
      ) : null}
    </div>
  );
}

const ICONS = [
  {
    id: 1,
    img: "https://i.imgur.com/cGHOFq0.png",
    name: "My projects",
    clickable: true,
    openWindow: {
      windowTitle: "My Projects - Explorer",
      kind: "explorer",
      img: "https://i.imgur.com/cGHOFq0.png",
    },
  },
  {
    id: 2,
    img: "https://i.imgur.com/Jcr3DHD.png",
    name: "Internet",
  },
  {
    id: 3,
    img: "https://i.imgur.com/40zFIUt.png",
    name: "Mail",
  },
  { id: 4, img: "https://i.imgur.com/nF7aR1E.png", name: "Messenger" },
  { id: 5, img: "https://i.imgur.com/sDQaimd.png", name: "Console" },
  {
    id: 6,
    img: "https://i.imgur.com/4sQ8mdp.png",
    name: "About me",
    clickable: true,
    openWindow: {
      windowTitle: "About me.txt - Notepad",
      kind: "notepad",
      img: "https://i.imgur.com/4sQ8mdp.png",
    },
  },
  {
    id: 7,
    img: "https://i.imgur.com/YgnoeXu.png",
    name: "Paint",
    clickable: true,
    openWindow: {
      windowTitle: "Paint",
      kind: "paint",
      img: "https://i.imgur.com/YgnoeXu.png",
    },
  },
  {
    id: 8,
    img: "https://i.imgur.com/YVxJ2Ce.png",
    name: "Contacts",
  },
  {
    id: 9,
    img: "https://i.imgur.com/Hm9EyOl.png",
    name: "Trash",
  },
  {
    id: 10,
    img: "https://i.imgur.com/ofmm2Sl.png",
    name: "Settings",
  },
  {
    id: 11,
    img: "https://help4windows.com/~webfiles/icons_win_xp/winxp_ico_shell32_dll-024.jpg",
    name: "Run",
  },
];

const Icon = ({
  img,
  name,
  clickable,
  openWindow: windowProps,
  setOpenMenu,
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    setOpenMenu(false);
    dispatch(openWindow(windowProps));
  };

  return (
    <article onClick={clickable ? handleClick : null} className={styles.Icon}>
      <img src={img} alt={name} />
      <p>{name}</p>
    </article>
  );
};
