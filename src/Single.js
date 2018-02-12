import React from "react";
import { Link, withRouter } from "react-router-dom";
import { graphql } from "react-apollo";
import Content from "./Content";

import { GetTodo } from "./queries";

const Single = ({ data: { loading, allTodoes }, match, history }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  const currentList = match.params.listId;
  const listSingle = allTodoes.find(item => item.id === currentList);

  if (!listSingle) {
    history.push("/");

    return false;
  }

  return (
    <div>
      <Link to="/">Back</Link>
      <Content
        style={{ margin: "3em" }}
        key={listSingle.id}
        list={listSingle}
      />
    </div>
  );
};

export default withRouter(graphql(GetTodo)(Single));
