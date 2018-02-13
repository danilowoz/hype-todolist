import React from "react"
import { connect } from "react-redux"
import { filterTodo } from "./actions"

const LinkFilter = ({ filter, current, children, filterTodo, list }) =>
  current ? (
    <span>{children}</span>
  ) : (
    <button onClick={() => filterTodo({ filter, list })}>{children}</button>
  )

const mapStateToProps = (state, ownProps) => {
  return {
    current: state.filter[ownProps.list] === ownProps.filter
  }
}

const mapDispatchToProps = dispatch => ({
  filterTodo(data) {
    dispatch(filterTodo(data))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LinkFilter)
