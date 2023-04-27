import { Router } from 'express'
import * as models from '../../models/todos'
import db from '../db/todos'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const allTodos: models.TodoList = await db.getAllTodos('')
    res.json(allTodos)
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      return res.sendStatus(500)
    } else {
      return res.send('An unknown error has occurred')
    }
  }
})

router.get('/:status', async (req, res) => {
  try {
    const status = req.params.status
    const allTodosByStatus: models.TodoList = await db.getAllTodos(status)
    res.json(allTodosByStatus)
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      return res.sendStatus(500)
    } else {
      return res.send('An unknown error has occurred')
    }
  }
})

router.delete('/delete/:todoId', async (req, res) => {
  try {
    const todoId = Number(req.params.todoId)
    const deletedTodo = await db.deleteTodoById(todoId)
    res.json(deletedTodo)
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      return res.sendStatus(500)
    } else {
      return res.send('An unknown error has occurred')
    }
  }
})

router.post('/add', async (req, res) => {
  try {
    const todoData = req.body
    const addedTodo = await db.addTodo(todoData)
    res.json(addedTodo)
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      return res.sendStatus(500)
    } else {
      return res.send('An unknown error has occurred')
    }
  }
})

router.put('/updateStatus/:todoId', async (req, res) => {
  try {
    const todoData = req.body
    const todoId = Number(req.params.todoId)
    const updatedTodo = await db.updateStatus(todoId, todoData)
    res.json(updatedTodo)
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      return res.sendStatus(500)
    } else {
      return res.send('An unknown error has occurred')
    }
  }
})
export default router
