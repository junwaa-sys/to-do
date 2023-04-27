import {
  UpdateTodoAction,
  UPDATE_TODOS_PENDING,
  UPDATE_TODOS_FULFILLED,
  UPDATE_TODOS_REJECTED,
} from '../actions/updateStatus'

interface UpdateTodoState {
  data: number[] | null
  error: string | null
  loading: boolean
}

const initialState = {
  data: null,
  error: null,
  loading: false,
}

const updateTodoReducer = (
  state = initialState,
  action: UpdateTodoAction
): UpdateTodoState => {
  const { type, payload } = action
  switch (type) {
    case UPDATE_TODOS_PENDING:
      return {
        data: null,
        error: null,
        loading: true,
      }

    case UPDATE_TODOS_FULFILLED:
      return {
        data: payload,
        error: null,
        loading: false,
      }

    case UPDATE_TODOS_REJECTED:
      return {
        data: null,
        error: payload,
        loading: false,
      }

    default:
      return state
  }
}

export default updateTodoReducer
