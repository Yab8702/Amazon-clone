import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import StateProvider from "./context/StateProvider.jsx";
import reducerfun from "./context/reducer";
const { reducer, initialState } = reducerfun();


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StateProvider reducer={reducer} intialValue={initialState}>
      <App />
    </StateProvider>
  </BrowserRouter>
);
