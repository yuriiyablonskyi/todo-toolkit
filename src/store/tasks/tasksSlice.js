import { createSlice } from '@reduxjs/toolkit'
import { fetchTodos } from './tasksActions'

const todosSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    loading: 'idle',
    error: null
  },

  reducers: {
    addNewTask(state, action) {
      state.tasks.push(action.payload.newTask)
    },
    updateTaskProperty(state, action) {
      const { id, property, value } = action.payload
      state.tasks = state.tasks.map((task) =>
        task.id === id ? { ...task, [property]: value } : task
      );
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id)
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending'
        }
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.tasks = action.payload
        }
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.error = action.payload
        }
      })
  }
})

export const { updateTaskProperty, deleteTask, addNewTask } = todosSlice.actions

export default todosSlice.reducer