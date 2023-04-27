import * as models from '../../models/todos'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { fetchTodoList } from '../actions/fetchTodo'
import { deleteTodo } from '../actions/deleteTodo'
import { addTodo } from '../actions/addTodo'
import { updateTodo } from '../actions/updateStatus'

// eslint-disable-next-line no-unused-vars
function AddTodo() {
  const [selectedDisplayOption, setSelectedDisplayOption] =
    useState<string>('all')
  const [editTodoDescription, setEditTodoDescription] = useState<string | null>(
    ''
  )
  const [todoStatus, setTodoStatus] = useState('')
  const [editTodo, setEditTodo] = useState<number | null>(null)
  const todoList = useAppSelector((state) => state.fetchTodo)
  const deletedTodo = useAppSelector((state) => state.deleteTodo)
  const addedTodo = useAppSelector((state) => state.addTodo)
  const updatedTodo = useAppSelector((state) => state.updateTodoStatus)
  const dispatch = useAppDispatch()

  useEffect(() => {
    async function getTodoList() {
      await dispatch(fetchTodoList(todoStatus))
    }

    getTodoList().catch((error) => {
      console.log(error)
    })
  }, [dispatch, deletedTodo, addedTodo, updatedTodo, todoStatus, editTodo])

  function handleDestroy(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> & {
      target: HTMLButtonElement
    }
  ) {
    const todoId = Number(e.target.name)
    dispatch(deleteTodo(todoId)).catch((error) => {
      console.log(error)
    })
  }

  function handleEdit(
    e: React.MouseEvent<HTMLLIElement, MouseEvent> & {
      target: HTMLButtonElement
    }
  ) {
    const editTodoId = Number(e.target.id)
    const description = e.target.textContent
    setEditTodo(editTodoId)
    setEditTodoDescription(description)
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement }
  ) {
    if (e.code == 'Enter' || e.code == 'NumpadEnter') {
      const todoData = { description: e.target.value, status: 'todo' }
      dispatch(addTodo(todoData))
      e.target.value = ''
    }
  }

  function markAsComplete(todoId: number) {
    const todoStatus = { status: 'completed' }
    dispatch(updateTodo(todoId, todoStatus))
  }

  function markAsTodo(todoId: number) {
    const todoStatus = { status: 'todo' }
    dispatch(updateTodo(todoId, todoStatus))
  }

  function handleCheckBox(e: React.ChangeEvent<HTMLInputElement>) {
    const todoId = Number(e.target.id)
    if (e.target.checked === true) {
      markAsComplete(todoId)
    } else {
      markAsTodo(todoId)
    }
  }

  function handleToggleAll() {
    todoList.data?.map((todo) => {
      markAsComplete(todo.id)
    })
  }

  function handleStatusToDisplay(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent> & {
      target: HTMLInputElement
    },
    todoStatus: string
  ) {
    e.preventDefault()
    setTodoStatus(todoStatus)
    setSelectedDisplayOption(todoStatus)
  }

  function clearComplted() {
    if (todoList.data != null) {
      todoList.data.map((todo) => {
        if (todo.status === 'completed') {
          dispatch(deleteTodo(todo.id))
        }
      })
    }
  }

  function handleEditChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditTodoDescription(e.target.value)
  }

  function handleSubmitChange(
    e: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement }
  ) {
    if (e.code == 'Enter' || e.code == 'NumpadEnter') {
      if (editTodoDescription != 'undefined' && editTodoDescription != null) {
        const updateData = { description: editTodoDescription }
        if (editTodo != null) {
          dispatch(updateTodo(editTodo, updateData))
        }
      }
      setEditTodo(null)
    }
  }

  return (
    <>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onKeyDown={handleKeyDown}
      />
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          onClick={handleToggleAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {todoList.data?.map((todo, index) => {
            return (
              <>
                <div key={index} className="view">
                  <li
                    className={
                      todo.status === 'completed'
                        ? 'completed'
                        : editTodo === todo.id
                        ? 'editing'
                        : ''
                    }
                    onDoubleClick={handleEdit}
                  >
                    <input
                      className="toggle"
                      id={todo.id.toString()}
                      type="checkbox"
                      checked={todo.status === 'completed' ? true : false}
                      onChange={handleCheckBox}
                    />
                    <label key={todo.id} id={todo.id.toString()}>
                      {todo.description}
                    </label>
                    <button
                      className="destroy"
                      name={todo.id.toString()}
                      data-id={todo.id}
                      onClick={handleDestroy}
                    ></button>
                    <input
                      className="edit"
                      value={editTodoDescription}
                      onChange={handleEditChange}
                      onKeyDown={handleSubmitChange}
                    />
                  </li>
                </div>
              </>
            )
          })}
        </ul>
      </section>
      <footer className="footer">
        <span className="todo-count">
          <strong>
            {todoList?.data?.filter((todo) => todo.status === 'todo').length}
          </strong>{' '}
          item left
        </span>
        <ul className="filters">
          <li>
            <a
              className={selectedDisplayOption === 'all' ? 'selected' : ''}
              href="#/all"
              onClick={(e) => {
                handleStatusToDisplay(e, '')
              }}
            >
              All
            </a>
          </li>
          <li>
            <a
              className={selectedDisplayOption === 'todo' ? 'selected' : ''}
              href="#/todo"
              onClick={(e) => {
                handleStatusToDisplay(e, 'todo')
              }}
            >
              Active
            </a>
          </li>
          <li>
            <a
              className={
                selectedDisplayOption === 'completed' ? 'selected' : ''
              }
              href="#/completed"
              onClick={(e) => {
                handleStatusToDisplay(e, 'completed')
              }}
            >
              Completed
            </a>
          </li>
        </ul>
        <button className="clear-completed" onClick={clearComplted}>
          Clear completed
        </button>
      </footer>
    </>
  )
}

export default AddTodo
