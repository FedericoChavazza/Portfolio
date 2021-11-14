import { bindActionCreators } from "redux";

export function openWindow(data) {
  return {
    payload: { ...data, isFocused: true, isMinimized: false },
    type: "OPEN_WINDOW",
  };
}

export function closeWindow(id) {
  return {
    payload: id,
    type: "CLOSE_WINDOW",
  };
}

export function focusWindow(id) {
  return {
    payload: id,
    type: "FOCUS_WINDOW",
  };
}

export function minimizedWindow(data) {
  return {
    payload: data,
    type: "MINIMIZED_WINDOW",
  };
}

export function openMinimizedWindow(data) {
  return {
    payload: data,
    type: "OPEN_MINIMIZED_WINDOW",
  };
}

export function grayscale(boolean) {
  return {
    payload: boolean,
    type: "GRAYSCALE_FILTER",
  };
}

export function turnedOffScreen(boolean) {
  return {
    payload: boolean,
    type: "TURNED_OFF_COMPUTER",
  };
}
