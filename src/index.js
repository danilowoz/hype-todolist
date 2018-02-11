import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Single from "./Single";

import { BrowserRouter as Router, Route } from "react-router-dom";

import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { Provider } from "react-redux";
import Reducer from "./reducers";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

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

ReactDOM.render(
  <Provider store={createStore(Reducer, applyMiddleware(logger))}>
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Route exact path="/" component={App} />
          <Route path="/:listId" component={Single} />
        </div>
      </Router>
    </ApolloProvider>
  </Provider>,
  document.getElementById("root")
);
