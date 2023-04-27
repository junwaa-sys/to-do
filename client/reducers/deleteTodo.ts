import {
  DeleteTodoAction,
  DELETE_TODOS_PENDING,
  DELETE_TODOS_FULFILLED,
  DELETE_TODOS_REJECTED,
} from '../actions/deleteTodo'

interface DeleteTodoState {
  data: number[] | null
  error: string | null
  loading: boolean
}

const initialState: DeleteTodoState = {
  data: null,
  error: null,
  loading: false,
}

const deleteTodoReducer = (
  state = initialState,
  action: DeleteTodoAction
): DeleteTodoState => {
  const { type, payload } = action
  switch (type) {
    case DELETE_TODOS_PENDING:
      return {
        data: null,
        error: null,
        loading: true,
      }

    case DELETE_TODOS_FULFILLED:
      return {
        data: payload,
        error: null,
        loading: false,
      }

    case DELETE_TODOS_REJECTED:
      return {
        data: null,
        error: payload,
        loading: false,
      }

    default:
      return state
  }
}

export default deleteTodoReducer
