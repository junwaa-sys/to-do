import {
  AddTodoAction,
  ADD_TODOS_PENDING,
  ADD_TODOS_FULFILLED,
  ADD_TODOS_REJECTED,
} from '../actions/addTodo'

interface AddTodoState {
  data: number[] | null
  error: string | null
  loading: boolean
}

const initialState: AddTodoState = {
  data: null,
  error: null,
  loading: false,
}

const addTodoReducer = (
  state = initialState,
  action: AddTodoAction
): AddTodoState => {
  const { type, payload } = action
  switch (type) {
    case ADD_TODOS_PENDING:
      return {
        data: null,
        error: null,
        loading: true,
      }

    case ADD_TODOS_FULFILLED:
      return {
        data: payload,
        error: null,
        loading: false,
      }

    case ADD_TODOS_REJECTED:
      return {
        data: null,
        error: payload,
        loading: false,
      }

    default:
      return state
  }
}

export default addTodoReducer
