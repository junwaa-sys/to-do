export interface TodoList {
  id: number
  description: string
  status: string
}

export type newTodo = Omit<TodoList, 'id'>
export type updateTodo = Partial<newTodo>
