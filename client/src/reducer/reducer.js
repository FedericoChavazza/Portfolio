const initialState = {
  data: [],
  grayscale: false,
  turnedOffComputer: false,
  windowsAction: "",
  menuCondition: false,
  shuttingDown: false,
  clippyExplained: {
    folder: false,
    aboutMe: false,
    paint: false,
  },
};

const reducer = (state = initialState, action) => {
  const lastId = state.data[state.data.length - 1]?.id + 1 || 1;

  switch (action.type) {
    case "RESET_STATE": {
      return {
        ...state,
        data: initialState.data,
      };
    }

    case "OPEN_WINDOW": {
      if (state.data.length) {
        return {
          ...state,
          data: [
            ...state.data.map((el) => ({ ...el, isFocused: false })),
            { ...action.payload, id: lastId },
          ],
        };
      } else {
        return {
          ...state,
          data: [{ ...action.payload, id: lastId }],
        };
      }
    }
    case "CLOSE_WINDOW": {
      let newData = state.data.filter(
        (element) => element.id !== action.payload
      );

      return {
        ...state,
        data: newData,
      };
    }
    case "CLIPPY_EXPLANATION": {
      return {
        ...state,
        clippyExplained: {
          ...state.clippyExplained,
          [action.payload]: true,
        },
      };
    }

    case "CLIPPY_RESET_EXPLANATION": {
      return {
        ...state,
        clippyExplained: initialState.clippyExplained,
      };
    }

    case "FOCUS_WINDOW": {
      return {
        ...state,
        data: state.data.map((element) =>
          element.id === action.payload
            ? { ...element, isFocused: true }
            : { ...element, isFocused: false }
        ),
      };
    }
    case "MINIMIZED_WINDOW": {
      return {
        ...state,
        data: state.data.map((element) =>
          element.id === action.payload || element.isMinimized
            ? { ...element, isMinimized: true, isFocused: false }
            : { ...element, isMinimized: false }
        ),
      };
    }
    case "OPEN_MINIMIZED_WINDOW": {
      const newData = [...state.data];

      newData.forEach(
        (el) => el.id === action.payload && (el.isMinimized = false)
      );

      return {
        ...state,
        data: newData,
      };
    }
    case "GRAYSCALE_FILTER": {
      return {
        ...state,
        grayscale: action.payload,
      };
    }
    case "TURNED_OFF_COMPUTER": {
      return {
        ...state,
        turnedOffComputer: action.payload,
      };
    }

    case "WINDOW_ACTION_CLOSE": {
      return {
        ...state,
        windowsAction: action.payload,
      };
    }
    case "MENU_CONDITION": {
      return {
        ...state,
        menuCondition: action.payload,
      };
    }
    case "SHUTTING_DOWN_SOUND": {
      return {
        ...state,
        shuttingDown: action.payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
