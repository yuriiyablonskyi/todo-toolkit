import { createAsyncThunk } from "@reduxjs/toolkit"
import { updateIsCompleted, editTask, deleteTask, addNewTask } from './tasksSlice'


export const fetchTodos = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=8')
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

export const deleteTaskOnServer = createAsyncThunk(
  'tasks/deleteTodo',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/' + id, {
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

export const updateIsCompletedOnServer = createAsyncThunk(
  'tasks/updateIsCompleted',
  async ({ id, completed }, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/' + id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          completed
        })
      })
      if (!response.ok) {
        throw new Error('Failed to update task status on the server.')
      }
      dispatch(updateIsCompleted({ id, completed }))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const editTaskOnServer = createAsyncThunk(
  'tasks/editTask',
  async ({ title, id }, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/' + id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title
        })
      })
      if (!response.ok) {
        throw new Error('Failed to edit the task status on the server.')
      }
      dispatch(editTask({ title, id }))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addNewTaskOnServer = createAsyncThunk(
  'tasks/deleteTodo',
  async (newTask, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/', {
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