import * as models from '../../models/todos'
import apis from '../apis/todos'
import type { ThunkAction } from '../store'

export const FETCH_TODOS_PENDING = 'FETCH_TODOS_PENDING'
export const FETCH_TODOS_RECEIVED = 'FETCH_TODOS_RECEIVED'
export const FETCH_TODOS_REJECTED = 'FETCH_TODOS_REJECTED'

export type FetchTodoAction =
  | { type: typeof FETCH_TODOS_PENDING; payload: void }
  | { type: typeof FETCH_TODOS_RECEIVED; payload: models.TodoList[] }
  | { type: typeof FETCH_TODOS_REJECTED; payload: string }

export function fetchTodoPending(): FetchTodoAction {
  return {
    type: FETCH_TODOS_PENDING,
  } as FetchTodoAction
}

export function fetchTodoReceived(results: models.TodoList[]): FetchTodoAction {
  return {
    type: FETCH_TODOS_RECEIVED,
    payload: results,
  }
}

export function fetchTodoRejected(errorMessage: string): FetchTodoAction {
  return {
    type: FETCH_TODOS_REJECTED,
    payload: errorMessage,
  }
}

export function fetchTodoList(todoStatus: string): ThunkAction {
  return (dispatch) => {
    dispatch(fetchTodoPending())
    return apis
      .getAllTodosByStatus(todoStatus)
      .then((todos) => {
        dispatch(fetchTodoReceived(todos))
      })
      .catch((error) => {
        dispatch(fetchTodoRejected(error.message))
      })
  }
}
