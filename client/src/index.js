import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createStore, applyMiddleware } from "redux"; // Menghapus impor "compose" karena tidak digunakan
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";

import "./index.css";
import App from "./App";

function Example() {
  useEffect(() => {
    document.title = "My Page Title";
  }, []);
}

// Menghapus bagian ini karena tidak menggunakan reducer
// const store = createStore(
//   reducers,
//   composeWithDevTools(applyMiddleware(thunk))
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // Menghapus <Provider> dan properti "store" karena tidak menggunakan reducer
  <App />
);
