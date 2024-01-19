import { createAsyncThunk } from '@reduxjs/toolkit'
import { updateTaskProperty, deleteTask, addNewTask } from './tasksSlice'

const todosApiUrl = 'https://jsonplaceholder.typicode.com/todos'

export const fetchTodos = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(todosApiUrl + '?_limit=10')
      if (!response.ok) {
        throw new Error('Error fetching.')
      }
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addNewTaskOnServer = createAsyncThunk(
  'tasks/deleteTodo',
  async (newTask, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(todosApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
      })
      if (!response.ok) {
        throw new Error('Failed to add new task status on the server.')
      }
      dispatch(addNewTask(newTask))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateTaskPropertyOnServer = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, property, value }, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${todosApiUrl}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          [property]: value
        })
      })
      if (!response.ok) {
        throw new Error('Failed to update task status on the server.')
      }
      dispatch(updateTaskProperty({ id, property, value }))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteTaskOnServer = createAsyncThunk(
  'tasks/deleteTodo',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${todosApiUrl}/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) {
        throw new Error('Error deleting task. Server error.')
      }
      dispatch(deleteTask({ id }))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)