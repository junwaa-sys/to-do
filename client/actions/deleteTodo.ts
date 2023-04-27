import apis from '../apis/todos'
import type { ThunkAction } from '../store'

export const DELETE_TODOS_PENDING = 'DELETE_TODOS_PENDING'
export const DELETE_TODOS_FULFILLED = 'DELETE_TODOS_FULFILLED'
export const DELETE_TODOS_REJECTED = 'DELETE_TODOS_REJECTED'

export type DeleteTodoAction =
  | { type: typeof DELETE_TODOS_PENDING; payload: void }
  | { type: typeof DELETE_TODOS_FULFILLED; payload: number[] }
  | { type: typeof DELETE_TODOS_REJECTED; payload: string }

export function deleteTodoPending(): DeleteTodoAction {
  return {
    type: DELETE_TODOS_PENDING,
  } as DeleteTodoAction
}

export function deleteTodoFullfilled(result: number[]): DeleteTodoAction {
  return {
    type: DELETE_TODOS_FULFILLED,
    payload: result,
  }
}

export function deleteTodoRejected(errorMessage: string): DeleteTodoAction {
  return {
    type: DELETE_TODOS_REJECTED,
    payload: errorMessage,
  }
}

export function deleteTodo(todoId: number): ThunkAction {
  return (dispatch) => {
    dispatch(deleteTodoPending())
    return apis
      .deleteTodo(todoId)
      .then((deletedTodo) => {
        dispatch(deleteTodoFullfilled(deletedTodo))
      })
      .catch((error) => {
        dispatch(deleteTodoRejected(error.message))
      })
  }
}
