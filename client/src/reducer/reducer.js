const initialState = {
  data: [],
  grayscale: false,
  turnedOffComputer: false,
  windowsAction: "",
};

const reducer = (state = initialState, action) => {
  const lastId = state.data[state.data.length - 1]?.id + 1 || 1;

  switch (action.type) {
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

      // newData[newData?.length - 1]?.isFocused = true;

      return {
        ...state,
        data: newData,
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
    default:
      return state;
  }
};

/* 
  [ 
    { id: 1, windowTitle: "My projects", isFocused: true, img: "http://", isMinimized: false }
  ]
*/

export default reducer;
