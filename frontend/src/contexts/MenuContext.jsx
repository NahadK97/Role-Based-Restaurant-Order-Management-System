import { createContext, useReducer } from "react";

export const MenuContext = createContext();

export const menuReducer = (state, action) => {
  switch (action.type) {
    case "SET_MENU":
      // payload should be the complete menu structure
      return {
        ...state,
        menu: action.payload,
        isLoading: false,
        error: null,
      };

    case "ADD_CATEGORY":
      // payload should be { category, dishes: [] }
      return {
        ...state,
        menu: [...state.menu, action.payload],
      };

    case "DELETE_CATEGORY":
      // payload should be category name
      return {
        ...state,
        menu: state.menu.filter((cat) => cat.category !== action.payload),
      };

    case "ADD_DISH":
      // payload should be { category, dish }
      return {
        ...state,
        menu: state.menu.map((cat) =>
          cat.category === action.payload.category
            ? { ...cat, dishes: [...cat.dishes, action.payload.dish] }
            : cat
        ),
      };

    case "DELETE_DISH":
      // payload should be { category, dishId }
      return {
        ...state,
        menu: state.menu.map((cat) =>
          cat.category === action.payload.category
            ? {
                ...cat,
                dishes: cat.dishes.filter(
                  (dish) => dish._id !== action.payload.dishId
                ),
              }
            : cat
        ),
      };
    default:
      return state;
  }
};

export const MenuContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(menuReducer, {
    menu: [], // Now expects array of categories
    isLoading: false,
    error: null,
  });

  return (
    <MenuContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MenuContext.Provider>
  );
};