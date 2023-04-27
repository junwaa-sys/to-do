import request from 'superagent'
import * as models from '../../models/todos'

async function getAllTodos(): Promise<models.TodoList[]> {
  const response = await request.get('/api/v1/todos/')
  return response.body
}

async function getAllTodosByStatus(
  todoStatus: string
): Promise<models.TodoList[]> {
  const response = await request.get('/api/v1/todos/' + todoStatus)
  return response.body
}

async function deleteTodo(todoId: number) {
  const response = await request.delete('/api/v1/todos/delete/' + todoId)
  return response.body
}

async function addTodo(todoData: models.newTodo) {
  const response = await request.post('/api/v1/todos/add').send(todoData)
  return response.body
}

async function updateTodo(todoId: number, todoData: models.updateTodo) {
  const response = await request
    .put('/api/v1/todos/updateStatus/' + todoId)
    .send(todoData)
  return response.body
}

export default {
  getAllTodos,
  deleteTodo,
  addTodo,
  getAllTodosByStatus,
  updateTodo,
}
