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
    // может обьеденить updateIsCompleted и editTask - они похожи очень
    updateIsCompleted(state, action) {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? { ...task, completed: action.payload.completed } : task
      )
    },

    editTask(state, action) {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? { ...task, title: action.payload.title } : task
      )
    },

    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id)
    },

    addNewTask(state, action) {
      state.tasks.push(action.payload.newTask)
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

export const { updateIsCompleted, editTask, deleteTask, addNewTask } = todosSlice.actions
export default todosSlice.reducer