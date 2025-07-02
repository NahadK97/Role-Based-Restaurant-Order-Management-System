import { useContext } from "react";
import { MenuContext } from "../contexts/MenuContext";

export const useMenuContext = () => {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error("useMenuContext must be used inside a MenuContextProvider");
  }

  return context;
};
