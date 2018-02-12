import { ADD_TODO, TOGGLE_TODO } from "../actions"

const initialState = []

const todo = (state = initialState, action) => {
  if (action === undefined) {
    return state
  }

  switch (action.type) {
    case ADD_TODO.ACTION:
      return [...state, action.payload]

    case TOGGLE_TODO.ACTION:
      return state.map(item => {
        if (item.index !== action.payload) {
          return item
        }
        return { ...item, completed: !item.completed }
      })

    default:
      return state
  }
}

export default todo
