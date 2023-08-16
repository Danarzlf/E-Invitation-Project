// store.js

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers"; // Buat reducer Anda sesuai kebutuhan

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
