import { useEffect, useRef, useCallback } from "react";
import { useClippy } from "@react95/clippy";
import Options from "../RightClick/Options";
import useWindowSize from "../../hook/useWindowsSize";

const ClippyComponent = ({
  clippyAnimate,
  clippyClose,
  contextMenuVisible,
  setContextMenuVisible,
  contextMenuPosition,
  setContextMenuPosition,
}) => {
  const { clippy } = useClippy();
  const clippyRef = useRef(null);
  const windowSize = useWindowSize();

  const getClippyMaxMovement = useCallback(
    (movement, position) => {
      return (movement * windowSize[position]) / 100;
    },
    [windowSize]
  );

  useEffect(() => {
    if (clippy) {
      clippyRef.current = clippy._el[0];
      clippy.play("Greeting");
      if (windowSize.width < 500) {
        clippy.moveTo(
          getClippyMaxMovement(2, "width"),
          getClippyMaxMovement(80, "height")
        );
      }
      const timer = setTimeout(() => {
        clippy.speak(
          "Hello! What you're about to see is a replica of the Windows interface, coded from scratch by me. You can explore it as if it were a real PC and find more information about me."
        );
      }, 500);

      const handleRightClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setContextMenuVisible(true);
        setContextMenuPosition({ x: event.clientX, y: event.clientY });
      };

      if (clippyRef.current) {
        clippyRef.current.addEventListener("contextmenu", handleRightClick);
      }

      return () => {
        clearTimeout(timer);
        if (clippyRef.current) {
          clippyRef.current.removeEventListener(
            "contextmenu",
            handleRightClick
          );
        }
      };
    }
  }, [clippy, setContextMenuVisible, setContextMenuPosition, windowSize.width]);

  const cbCloseMenuFunction = (cb) => {
    if (typeof cb === "function") {
      cb();
    }
    setContextMenuVisible(false);
  };

  const clippyOptions = [
    {
      handleClick: () => cbCloseMenuFunction(clippyClose),
      option: "Close",
    },
    {
      handleClick: () => cbCloseMenuFunction(clippyAnimate),
      option: "Animate",
    },
  ];

  return (
    <Options
      display={contextMenuVisible}
      setDisplay={setContextMenuVisible}
      position={contextMenuPosition}
      options={clippyOptions}
      ref={clippyRef}
    />
  );
};

export default ClippyComponent;
