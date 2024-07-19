import {
  React,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Home.module.css";
import { FolderView } from "./FolderView";
import GIT from "./../Images/github.png";
import { Menu } from "./Menu";
import {
  openWindow,
  focusWindow,
  openMinimizedWindow,
  minimizedWindow,
  clippyExplained,
  resetClippyExplained,
} from "../actions/actions";
import { ShuttingDown } from "./ShuttingDown";
import { useHour } from "../hook/useHour";
import useSound from "use-sound";
import clickSound from "./../sounds/windows_click.mp3";
import ClippyComponent from "./ClippyJS/ClippyJs";
import Icon from "./Icon/Icon";
import Options from "./RightClick/Options";
import { useClippy } from "@react95/clippy";
import useWindowSize from "../hook/useWindowsSize";

export default function Home() {
  const data = useSelector((state) => state.data);
  const closedState = useSelector((state) => state.turnedOffComputer);
  const menuState = useRef(false);
  const isMotoG4 = window.matchMedia("(max-width: 500px)").matches;
  const { clippy } = useClippy();
  const shuttingDownComputer = useSelector((state) => state.shuttingDown);
  const hasClippyExplained = useSelector((state) => state.clippyExplained);
  const [clippyHidden, setClippyHidden] = useState(false);
  const dispatch = useDispatch();
  const [clickSoundMaker] = useSound(clickSound);
  const [openMenu, setOpenMenu] = useState(false);
  const hour = useHour();
  const windowSize = useWindowSize();

  const getClippyMaxMovement = useCallback(
    (movement, position) => {
      return (movement * windowSize[position]) / 100;
    },
    [windowSize]
  );

  console.log(getClippyMaxMovement(80, "width"));

  //menu context

  const [contextMenuVisible, setContextMenuVisible] = useState(false);

  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });

  //clippy context

  const [clippyContextMenuVisible, setClippyContextMenuVisible] =
    useState(false);
  const [clippyContextMenuPosition, setClippyContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });

  const mainContainerRef = useRef(null);

  const handleContextMenu = useCallback((event) => {
    console.log("handleContextMenu called");
    event.preventDefault();
    if (
      mainContainerRef.current &&
      mainContainerRef.current.contains(event.target)
    ) {
      setClippyContextMenuVisible(false);
    }
  }, []);

  useEffect(() => {
    const handleRightClick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      setContextMenuVisible(true);
      setClippyContextMenuVisible(false);
      setContextMenuPosition({ x: event.clientX, y: event.clientY });
    };

    const currentContainer = mainContainerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener("contextmenu", handleRightClick);
    }

    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener("contextmenu", handleRightClick);
      }
    };
  }, []);

  const handleClick = useCallback(() => {
    console.log("handleClick called");
    if (contextMenuVisible) {
      setContextMenuVisible(false);
    }
    if (clippyContextMenuVisible) {
      console.log("Closing clippy context menu");
      setClippyContextMenuVisible(false);
    }
  }, [clippyContextMenuVisible, contextMenuVisible]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleContextMenu);
    if (!shuttingDownComputer) {
      document.addEventListener("click", clickSoundMaker);
    }

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [handleClick, handleContextMenu, shuttingDownComputer, clickSoundMaker]);

  useEffect(() => {
    const handleBodyClick = (event) => {
      const flyoutElement = document.getElementById("menu");
      const imgElement = document.getElementById("openmenu-img");

      let targetElement = event.target;

      do {
        if (targetElement === flyoutElement || targetElement === imgElement) {
          return;
        }

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
  }, [openMenu]);

  const hasAlreadyExplained = useCallback(() => {
    clippy.stop();
    clippy.moveTo({
      x: getClippyMaxMovement(80, "width"),
      y: getClippyMaxMovement(80, "height"),
    });
  }, [clippy, getClippyMaxMovement]);

  const clippyExplain = useCallback(
    (name, dialog, move, gesture) => {
      if (clippyHidden) return;
      clippy.stop();
      clippy.stopCurrent();

      if (!hasClippyExplained[name]) {
        dispatch(clippyExplained(name));
        clippy.moveTo(move.x, move.y);
        gesture && clippy.gestureAt(gesture.x, gesture.y);
        clippy.speak(dialog);
      } else {
        hasAlreadyExplained();
      }
    },
    [clippy, clippyHidden, dispatch, hasAlreadyExplained, hasClippyExplained]
  );

  const clippyLeaveMessage = () => {
    clippy.speak(
      "Well, If you need me for something else, do not doubt to right click the screen!"
    );
    setTimeout(() => {
      clippy.hide();
      setClippyHidden(true);
    }, 4500);
  };

  const clippyAnimationTrigger = () => {
    clippy.animate();
  };

  const handleClickedTimes = (event, url) => {
    event.preventDefault();
    window.open(url, "_blank");
  };

  const backgroundOptions = useMemo(() => {
    const options = [
      {
        option: "Open",
        fontWeight: true,
        disabled: true,
      },
      {
        option: "Refresh",
        handleClick: () => {
          window.location.reload();
        },
      },
      {
        handleClick: () => {
          dispatch(
            openWindow({
              windowTitle: "Untitled - Notepad",
              kind: "emptyNotepad",
              img: "https://i.imgur.com/4sQ8mdp.png",
            })
          );
        },
        option: "Notepad",
      },
      {
        handleClick: () => {
          clippyExplain(
            "folder",
            "This folder contains all the projects I've been working on. Inside each .txt file, you will find the project's title, its GitHub link, and details about it",
            {
              x: getClippyMaxMovement(15, "width"),
              y: getClippyMaxMovement(65, "height"),
            },
            { x: 0, y: 100 }
          );
          dispatch(
            openWindow({
              windowTitle: "My Projects - Explorer",
              kind: "explorer",
              img: "https://i.imgur.com/cGHOFq0.png",
            })
          );
        },
        option: "Explore My Projects",
      },
      {
        handleClick: () => {
          clippyExplain(
            "aboutMe",
            "This is my personal information. Here you can download my CV or take a look at my GitHub!",
            {
              x: getClippyMaxMovement(10, "width"),
              y: getClippyMaxMovement(65, "height"),
            },
            { x: 1000, y: 0 }
          );
          dispatch(
            openWindow({
              windowTitle: "About me.txt - Notepad",
              kind: "notepad",
              img: "https://i.imgur.com/4sQ8mdp.png",
            })
          );
        },
        option: "Explore About me",
      },
      {
        handleClick: () => {
          clippyExplain(
            "paint",
            "Let's see how talented of a painter you truly are",
            {
              x: getClippyMaxMovement(80, "width"),
              y: getClippyMaxMovement(80, "height"),
            }
          );
          dispatch(
            openWindow({
              windowTitle: "Paint",
              kind: "paint",
              img: "https://i.imgur.com/YgnoeXu.png",
            })
          );
        },
        option: "Paint",
      },
    ];

    if (clippyHidden) {
      options.push({
        handleClick: () => {
          setClippyHidden(false);
          clippy.show();
          clippy.speak(
            "Hello, I'm back! If you need anything, just click the icons you have questions about."
          );
          dispatch(resetClippyExplained());
        },
        option: "Call Clippy",
      });
    }

    return options;
  }, [clippyHidden, dispatch, clippyExplain, getClippyMaxMovement, clippy]);

  return (
    <div ref={mainContainerRef}>
      <ClippyComponent
        clippyAnimate={clippyAnimationTrigger}
        clippyClose={clippyLeaveMessage}
        contextMenuVisible={clippyContextMenuVisible}
        setContextMenuVisible={setClippyContextMenuVisible}
        contextMenuPosition={clippyContextMenuPosition}
        setContextMenuPosition={setClippyContextMenuPosition}
      />
      {!closedState ? (
        <div className={styles.body}>
          <div className={styles.icons}>
            <Icon
              handleClick={(event) =>
                handleClickedTimes(
                  event,
                  "https://www.linkedin.com/in/federico-chavazza/"
                )
              }
              name="Linkedin"
              img="https://cdn-icons-png.flaticon.com/512/174/174857.png"
            />
            <Icon
              handleClick={(event) =>
                handleClickedTimes(event, "https://github.com/FedericoChavazza")
              }
              name="GitHub"
              img={GIT}
            />
            <Icon
              handleClick={(event) =>
                handleClickedTimes(
                  event,
                  "https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=fchavazza@gmail.com&su=Subject&body=Body%20Text"
                )
              }
              name="Gmail"
              img="https://cdn-icons-png.flaticon.com/512/281/281769.png"
            />
            <Icon
              handleClick={() => {
                clippyExplain(
                  "aboutMe",
                  "This is my personal information, here you can download my CV or take a look to my Github!",
                  {
                    x: getClippyMaxMovement(10, "width"),
                    y: getClippyMaxMovement(65, "height"),
                  },
                  { x: 1000, y: 0 }
                );
                dispatch(
                  openWindow({
                    windowTitle: "About me.txt - Notepad",
                    kind: "notepad",
                    img: "https://i.imgur.com/4sQ8mdp.png",
                  })
                );
              }}
              name="About me.txt"
              img="https://i.imgur.com/4sQ8mdp.png"
            />
            <Icon
              handleClick={() => {
                clippyExplain(
                  "folder",
                  "This folder contains all the projects I've been working on. Inside each .txt file, you will find the project's title, its GitHub link, and details about it",
                  {
                    x: getClippyMaxMovement(15, "width"),
                    y: getClippyMaxMovement(65, "height"),
                  },
                  { x: 0, y: 100 }
                );
                dispatch(
                  openWindow({
                    windowTitle: "My Projects - Explorer",
                    kind: "explorer",
                    img: "https://i.imgur.com/cGHOFq0.png",
                  })
                );
              }}
              name="My Projects"
              img="https://i.imgur.com/cGHOFq0.png"
            />
            <Icon
              handleClick={() => {
                clippyExplain(
                  "paint",
                  "Let's see how talented of a painter you trully are",
                  {
                    x: getClippyMaxMovement(80, "width"),
                    y: getClippyMaxMovement(80, "height"),
                  }
                );
                dispatch(
                  openWindow({
                    windowTitle: "Paint",
                    kind: "paint",
                    img: "https://i.imgur.com/YgnoeXu.png",
                  })
                );
              }}
              name="Paint"
              img="https://i.imgur.com/YgnoeXu.png"
            />
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
                        alt=""
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
        </div>
      ) : (
        <ShuttingDown />
      )}
      <Options
        ref={mainContainerRef}
        display={contextMenuVisible}
        setDisplay={setContextMenuVisible}
        position={contextMenuPosition}
        options={backgroundOptions}
      />
    </div>
  );
}
