import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Auth from "./Auth"
import Sheet from "./Sheet"
import Login from "./Login"
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Login/> */}
    <Auth/>
    <Sheet/>
    {/* <App /> */}
  </React.StrictMode>
);
