import * as models from '../../models/todos'
import { ThunkAction } from '../store'
import apis from '../apis/todos'

export const ADD_TODOS_PENDING = 'ADD_TODOS_PENDING'
export const ADD_TODOS_FULFILLED = 'ADD_TODOS_FULFILLED'
export const ADD_TODOS_REJECTED = 'ADD_TODOS_REJECTED'

export type AddTodoAction =
  | { type: typeof ADD_TODOS_PENDING; payload: void }
  | { type: typeof ADD_TODOS_FULFILLED; payload: number[] }
  | { type: typeof ADD_TODOS_REJECTED; payload: string }

export function AddTodoPending(): AddTodoAction {
  return {
    type: ADD_TODOS_PENDING,
  } as AddTodoAction
}

export function AddTodoFullfilled(result: number[]): AddTodoAction {
  return {
    type: ADD_TODOS_FULFILLED,
    payload: result,
  }
}

export function AddTodoRejected(errorMessage: string): AddTodoAction {
  return {
    type: ADD_TODOS_REJECTED,
    payload: errorMessage,
  }
}

export function addTodo(todoData: models.newTodo): ThunkAction {
  return (dispatch) => {
    dispatch(AddTodoPending())
    return apis
      .addTodo(todoData)
      .then((addedTodo) => {
        dispatch(AddTodoFullfilled(addedTodo))
      })
      .catch((error) => {
        dispatch(AddTodoRejected(error.message))
      })
  }
}
