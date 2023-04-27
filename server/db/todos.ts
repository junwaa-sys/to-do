import * as models from '../../models/todos'
import connection from './connection'

function getAllTodos(
  todoStatus: string,
  db = connection
): Promise<models.TodoList> {
  return db('todos').select().whereLike('status', `%${todoStatus}%`)
}

function getAllTodosbyStatus(
  status: string,
  db = connection
): Promise<models.TodoList> {
  return db('todos').select().where('status', status)
}

function deleteTodoById(todoId: number, db = connection) {
  return db('todos').delete().where('id', todoId)
}

function addTodo(todoData: models.newTodo, db = connection) {
  return db('todos').insert(todoData)
}

function editTodo(todoId: number, db = connection) {
  return db('todos').delete().where('id', todoId)
}

function updateStatus(
  todoId: number,
  todoData: models.updateTodo,
  db = connection
) {
  return db('todos').update(todoData).where('id', todoId)
}
export default {
  getAllTodos,
  deleteTodoById,
  getAllTodosbyStatus,
  addTodo,
  editTodo,
  updateStatus,
}
