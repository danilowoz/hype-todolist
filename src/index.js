import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Content from "./Content";
import registerServiceWorker from "./registerServiceWorker";
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
  <ApolloProvider
    client={client}
    store={createStore(Reducer, applyMiddleware(logger))}
  >
    <Content />
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();
