import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { Provider } from "react-redux";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import Loadable from "react-loadable";

import App from "./App";
import Single from "./Single";
import Loading from "./Loading";
import Reducer from "./reducers";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.graph.cool/simple/v1/cjddotj9701v201790x2y7qr3"
  }),
  cache: new InMemoryCache()
});

const logger = createLogger({
  level: "info",
  collapsed: true
});

const LoadableApp = Loadable({
  loader: () => import("./App"),
  loading: Loading
});

const LoadableSingle = Loadable({
  loader: () => import("./Single"),
  loading: Loading
});

ReactDOM.render(
  <Provider store={createStore(Reducer, applyMiddleware(logger))}>
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Route exact path="/" component={LoadableApp} />
          <Route path="/:listId" component={LoadableSingle} />
        </div>
      </Router>
    </ApolloProvider>
  </Provider>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept("../src/index", () => render(App));
}
