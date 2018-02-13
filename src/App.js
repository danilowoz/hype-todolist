import React, { Fragment } from "react"
import { graphql } from "react-apollo"
import { Helmet } from "react-helmet"

import { GetTodo } from "./queries"
import Content from "./Content"
import AddTodo from "./add-todo"

const App = ({ data: { loading, allTodoes } }) => {
  if (loading) {
    return <p>Loading...</p>
  }
  return (
    <Fragment>
      <Helmet>
        <title>All lists</title>
      </Helmet>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {allTodoes.map(item => (
          <Content style={{ margin: "3em" }} key={item.id} list={item} />
        ))}
      </div>
      <AddTodo />
    </Fragment>
  )
}

export default graphql(GetTodo)(App)
