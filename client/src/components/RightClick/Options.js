import React, { forwardRef } from "react";
import useOnClickOutside from "../../hook/useOnClickOutside";
import styles from "./Options.module.css";

const Options = forwardRef(
  ({ display, setDisplay, position, options }, ref) => {
    useOnClickOutside(ref, () => {
      console.log("Clicked outside, closing options");
      setDisplay(false);
    });

    console.log("Options component rendered. Display state:", display);

    return (
      display && (
        <ul
          ref={ref}
          className={styles.clippyOptions}
          style={{
            top: position.y,
            left: position.x,
          }}
        >
          {options.map(
            ({ handleClick, option, fontWeight = false, disabled = false }) => (
              <li
                className={disabled && styles.disabled}
                style={{
                  fontWeight: fontWeight ? 500 : 400,
                }}
                key={option}
                onClick={handleClick ?? null}
              >
                {option}
              </li>
            )
          )}
        </ul>
      )
    );
  }
);

export default Options;
