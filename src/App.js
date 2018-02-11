import React, { Fragment } from "react";
import { graphql } from "react-apollo";

import { GetTodo } from "./queries";
import Content from "./Content";
import AddTodo from "./add-todo";

const App = ({ data: { loading, allTodoes } }) => {
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <Fragment>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {allTodoes.map(item => (
          <Content style={{ margin: "3em" }} key={item.id} list={item} />
        ))}
      </div>
      <AddTodo />
    </Fragment>
  );
};

export default graphql(GetTodo)(App);
