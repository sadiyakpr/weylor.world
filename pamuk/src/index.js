import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import ShopContextProvider from "./Context/ShopContext";
import { AuthProvider } from "./Context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <AuthProvider>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </AuthProvider>
  </BrowserRouter>
);
