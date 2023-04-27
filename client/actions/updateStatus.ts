import { ThunkAction } from '../store'
import apis from '../apis/todos'
import * as models from '../../models/todos'

export const UPDATE_TODOS_PENDING = 'UPDATE_TODOS_PENDING'
export const UPDATE_TODOS_FULFILLED = 'UPDATE_TODOS_FULFILLED'
export const UPDATE_TODOS_REJECTED = 'UPDATE_TODOS_REJECTED'

export type UpdateTodoAction =
  | { type: typeof UPDATE_TODOS_PENDING; payload: void }
  | { type: typeof UPDATE_TODOS_FULFILLED; payload: number[] }
  | { type: typeof UPDATE_TODOS_REJECTED; payload: string }

export function UpdateTodoPending(): UpdateTodoAction {
  return {
    type: UPDATE_TODOS_PENDING,
  } as UpdateTodoAction
}

export function UpdateTodoFullfilled(result: number[]): UpdateTodoAction {
  return {
    type: UPDATE_TODOS_FULFILLED,
    payload: result,
  }
}

export function UpdateTodoRejected(errorMessage: string): UpdateTodoAction {
  return {
    type: UPDATE_TODOS_REJECTED,
    payload: errorMessage,
  }
}

export function updateTodo(
  todoId: number,
  todoStatus: models.updateTodo
): ThunkAction {
  return (dispatch) => {
    dispatch(UpdateTodoPending())
    return apis
      .updateTodo(todoId, todoStatus)
      .then((updatedTodo) => {
        dispatch(UpdateTodoFullfilled(updatedTodo))
      })
      .catch((error) => {
        dispatch(UpdateTodoRejected(error.message))
      })
  }
}
