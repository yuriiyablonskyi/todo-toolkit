import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchTodos = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=6')
      if (!response.ok) {
        throw new Error('Error fetching')
      }
      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const todosSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    loading: 'idle',
    error: null
  },
  reducers: {
    updateIsCompleted(state, action) {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? { ...task, completed: action.payload.isCompleted } : task
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
          // state.tasks.push(action.payload)
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