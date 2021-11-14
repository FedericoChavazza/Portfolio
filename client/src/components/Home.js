import { React, useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import Modal from "react-modal";
import { FolderView } from "./FolderView";
import GIT from "./../Images/nashe.png";
import { Menu } from "./Menu";
import {
  openWindow,
  closeWindow,
  focusWindow,
  openMinimizedWindow,
  minimizedWindow,
} from "../actions/actions";
import { ShuttingDown } from "./ShuttingDown";
import { useHour } from "../hook/useHour";

export default function Home() {
  const dataChange = useSelector((state) => state.windowsAction);
  const data = useSelector((state) => state.data);
  const grayscale = useSelector((state) => state.grayscale);
  const closedState = useSelector((state) => state.turnedOffComputer);
  const menuState = useRef(false);
  const isMotoG4 = window.matchMedia("(max-width: 500px)").matches;

  const dispatch = useDispatch();

  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);
  const [folder, setFolder] = useState(false);
  const [clicks, setClicks] = useState({
    linkedin: 0,
    github: 0,
    gmail: 0,
    aboutme: 0,
    myprojects: 0,
  });
  const [openMenu, setOpenMenu] = useState(false);
  const [selected, setSelected] = useState({});
  const hour = useHour();

  function timesClick(option, e) {
    setClicks({
      linkedin: 0,
      github: 0,
      gmail: 0,
      aboutme: 0,
      myprojects: 0,
      [option]: clicks[option] ? clicks[option] + 1 : 1,
    });
  }

  const setTimesClick = (e) => {
    if (clicks[e.target.id] < 1) {
      e.preventDefault();
    }

    setClicks({
      linkedin: 0,
      github: 0,
      gmail: 0,
      aboutme: 0,
      myprojects: 0,
      [e.target.id]: clicks[e.target.id] + 1,
    });
  };

  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      setAnchorPoint({ x: event.pageX, y: event.pageY });
      setShow(true);
    },
    [setAnchorPoint]
  );

  const handleClick = useCallback(() => (show ? setShow(false) : null), [show]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  });

  useEffect(() => {
    const handleBodyClick = (event) => {
      const flyoutElement = document.getElementById("menu");
      const imgElement = document.getElementById("openmenu-img");

      let targetElement = event.target; // clicked element

      do {
        if (targetElement == flyoutElement || targetElement == imgElement) {
          // This is a click inside. Do nothing, just return.
          return;
        }
        // Go up the DOM
        targetElement = targetElement.parentNode;
      } while (targetElement);

      if (menuState) {
        setOpenMenu(false);
        menuState.current = false;
      }
    };

    document.addEventListener("click", handleBodyClick);

    return () => document.removeEventListener("click", handleBodyClick);
  }, []);

  useEffect(() => {
    menuState.current = openMenu;

    console.log({ menuState });
  }, [openMenu]);

  return (
    <div>
      {show ? (
        <div
          style={{
            position: "absolute",
            top: anchorPoint.y,
            left: anchorPoint.x,
            backgroundColor: " rgba(238, 236, 221, 1)",
            listStyle: "none",
            height: "255px",
            width: "190px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: "15px",
          }}
        >
          <div
            style={{
              borderBottom: "2px solid rgba(156,163,175,1)",
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              flexDirection: "column",
              padding: "10px",
              width: "100%",
              paddingLeft: "25px",
            }}
          >
            <div>Arrange Icons By</div>
            <div>Refresh</div>
          </div>
          <div
            style={{
              borderBottom: "2px solid rgba(156,163,175,1)",
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              flexDirection: "column",
              padding: "10px",
              width: "100%",
              paddingLeft: "25px",
            }}
          >
            <div>Paste</div>
            <div>Paste Shortcut</div>
          </div>
          <div
            style={{
              borderBottom: "2px solid rgba(156,163,175,1)",
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              flexDirection: "column",
              padding: "10px",
              width: "100%",
              paddingLeft: "25px",
            }}
          >
            <div>New</div>
          </div>
          <div
            style={{
              borderBottom: "2px solid rgba(156,163,175,1)",
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              flexDirection: "column",
              padding: "10px",
              width: "100%",
              paddingLeft: "25px",
            }}
          >
            <div>Change Background</div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              flexDirection: "column",
              padding: "10px",
              width: "100%",
              paddingLeft: "25px",
            }}
          >
            <div>Properties</div>
          </div>
        </div>
      ) : (
        <> </>
      )}
      {!closedState ? (
        <div className={styles.body}>
          <div className={styles.icons}>
            <button className={styles.singleIconClick}>
              <a
                href="https://www.linkedin.com/in/federico-chavazza/"
                id="linkedin"
                target="_blank"
                onClick={(e) => {
                  if (clicks.linkedin < 1) {
                    e.preventDefault();
                  }

                  setClicks({
                    github: 0,
                    gmail: 0,
                    aboutme: 0,
                    myprojects: 0,
                    linkedin: clicks.linkedin + 1,
                  });
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                  alt="Linkedin"
                />
                <div>Linkedin</div>
              </a>
            </button>
            <button className={styles.singleIconClick}>
              <a
                onClick={(e) => {
                  if (clicks.github < 1) {
                    e.preventDefault();
                  }

                  setClicks({
                    linkedin: 0,
                    gmail: 0,
                    aboutme: 0,
                    myprojects: 0,
                    github: clicks.github + 1,
                  });
                }}
                id="github"
                target="_blank"
                href="https://github.com/FedericoChavazza"
              >
                <img src={GIT} alt="GitHub" />
                <div>GitHub</div>
              </a>
            </button>
            <button className={styles.singleIconClick}>
              <a
                onClick={(e) => {
                  if (clicks.gmail < 1) {
                    e.preventDefault();
                  }

                  setClicks({
                    linkedin: 0,
                    github: 0,
                    aboutme: 0,
                    myprojects: 0,
                    gmail: clicks.gmail + 1,
                  });
                }}
                id="gmail"
                target="_blank"
                href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=fchavazza@gmail.com&su=Subject&body=Body%20Text"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/281/281769.png"
                  alt="Gmail"
                />
                <div>Gmail</div>
              </a>
            </button>
            <button className={styles.singleIconClick}>
              <div
                onClick={(e) => {
                  if (clicks.aboutme > 0) {
                    dispatch(
                      openWindow({
                        windowTitle: "About me.txt - Notepad",
                        kind: "notepad",
                        img: "https://i.imgur.com/4sQ8mdp.png",
                      })
                    );

                    setClicks({
                      linkedin: 0,
                      github: 0,
                      gmail: 0,
                      myprojects: 0,
                      aboutme: 0,
                    });
                  } else {
                    setClicks({
                      linkedin: 0,
                      github: 0,
                      gmail: 0,
                      myprojects: 0,
                      aboutme: clicks.aboutme + 1,
                    });
                  }
                }}
              >
                <img src="https://i.imgur.com/4sQ8mdp.png" alt="TXT" />
                <div
                  style={{
                    fontSize: "16px",
                    textShadow: "0 0 3px black",
                    color: "white",
                  }}
                >
                  About me.txt
                </div>
              </div>
            </button>
            <button className={styles.singleIconClick}>
              <div
                onClick={(e) => {
                  if (clicks.myprojects > 0) {
                    dispatch(
                      openWindow({
                        windowTitle: "My Projects - Explorer",
                        kind: "explorer",
                        img: "https://i.imgur.com/cGHOFq0.png",
                      })
                    );
                    setClicks({
                      linkedin: 0,
                      github: 0,
                      aboutme: 0,
                      gmail: 0,
                      myprojects: 0,
                    });
                  } else {
                    setClicks({
                      linkedin: 0,
                      github: 0,
                      aboutme: 0,
                      gmail: 0,
                      myprojects: clicks.myprojects + 1,
                    });
                  }
                }}
              >
                <img src="https://i.imgur.com/cGHOFq0.png" alt="Folder" />
                <div
                  style={{
                    fontSize: "16px",
                    textShadow: "0 0 3px black",
                    color: "white",
                  }}
                >
                  Projects
                </div>
              </div>
            </button>
          </div>

          <footer className={styles.footerContainer}>
            <div className={`${isMotoG4 && styles.hidden}`}>
              {openMenu && <Menu setOpenMenu={setOpenMenu} />}
            </div>
            <div className={styles.footer}>
              <button
                style={{ cursor: "pointer" }}
                className={styles.homeButton}
              >
                <img
                  onClick={() => (isMotoG4 ? null : setOpenMenu(!openMenu))}
                  id="openmenu-img"
                  src={
                    openMenu
                      ? "https://i.imgur.com/86x2M1f.png"
                      : "https://i.imgur.com/7aAYVFQ.png"
                  }
                  alt="INICIO"
                />
              </button>
              <div className={styles.statusBar}>
                {data?.map((value) => {
                  return (
                    <div
                      onClick={() => {
                        dispatch(focusWindow(value.id));
                        value.isMinimized &&
                          dispatch(openMinimizedWindow(value.id));
                        if (!value.isMinimized && value.isFocused) {
                          dispatch(minimizedWindow(value.id));
                        }
                      }}
                      className={`${styles.windowBar} ${
                        value.isFocused &&
                        !value.isMinimized &&
                        styles.notFocused
                      }`}
                    >
                      <img
                        style={{ height: "16px", width: "16px" }}
                        src={value.img}
                      />
                      {<p>{value.windowTitle} </p>}
                    </div>
                  );
                })}
              </div>
              <div className={`${styles.toolbar} ${isMotoG4 && styles.hidden}`}>
                <img src="https://i.imgur.com/nF7aR1E.png" alt="user" />
                <p>{hour}</p>
              </div>
            </div>
          </footer>

          <div className="bounces"></div>

          {data && data.length
            ? data.map((el) => (
                <FolderView isMotoG4={isMotoG4} key={el.id} {...el} />
              ))
            : null}
          {/* {folder ? (
        <FolderView selected={selected} folder={folder} setFolder={setFolder} />
      ) : null} */}
        </div>
      ) : (
        <ShuttingDown info={dataChange} />
      )}
    </div>
  );
}

/* 
  [{ id: 1, windowTitle: "My projects"}, { id: 2, windowTitle: "Hola"}]

*/
