import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { Provider } from "react-redux";
import Reducer from "./reducers";

const logger = createLogger({
  level: "info",
  collapsed: true
});

ReactDOM.render(
  <Provider store={createStore(Reducer, applyMiddleware(logger))}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
