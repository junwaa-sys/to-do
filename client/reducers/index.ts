import { combineReducers } from 'redux'
import fetchTodoReducer from './fetchTodo'
import deleteTodoReducer from './deleteTodo'
import addTodoReducer from './addTodo'
import updateTodoReducer from './updateTodo'
// import stuff from './stuff'

export default combineReducers({
  // stuff
  fetchTodo: fetchTodoReducer,
  deleteTodo: deleteTodoReducer,
  addTodo: addTodoReducer,
  updateTodoStatus: updateTodoReducer,
})
