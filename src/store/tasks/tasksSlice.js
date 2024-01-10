import { createSlice } from "@reduxjs/toolkit"

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
  }
})

export const { updateIsCompleted, editTask, deleteTask, addNewTask } = todosSlice.actions
export default todosSlice.reducer