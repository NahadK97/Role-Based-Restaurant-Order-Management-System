import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./contexts/AuthContext";
import { MenuContextProvider } from "./contexts/MenuContext";
import "./index.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MenuContextProvider>
        <App />
      </MenuContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
