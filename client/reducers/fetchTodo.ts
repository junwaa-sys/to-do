import * as models from '../../models/todos'
import {
  FetchTodoAction,
  FETCH_TODOS_PENDING,
  FETCH_TODOS_RECEIVED,
  FETCH_TODOS_REJECTED,
} from '../actions/fetchTodo'

interface FetchTodoState {
  data: models.TodoList[] | null
  error: string | null
  loading: boolean
}

const initialState: FetchTodoState = {
  data: null,
  error: null,
  loading: false,
}
const fetchTodoReducer = (
  state = initialState,
  action: FetchTodoAction
): FetchTodoState => {
  const { type, payload } = action
  switch (type) {
    case FETCH_TODOS_PENDING:
      return {
        data: null,
        error: null,
        loading: true,
      }

    case FETCH_TODOS_RECEIVED:
      return {
        data: payload,
        error: null,
        loading: false,
      }

    case FETCH_TODOS_REJECTED:
      return {
        data: null,
        error: payload,
        loading: false,
      }

    default:
      return state
  }
}

export default fetchTodoReducer
