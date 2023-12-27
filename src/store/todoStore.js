import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchTodos = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=6')
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
  'tasks/deleteTodo',
  async (id, { rejectWithValue, dispatch, getState }) => {
    const task = getState().tasks.find(({ taskId }) => id === taskId)
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/' + id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          completed: !task.completed
        })
      })
      if (!response.ok) {
        throw new Error('Failed to update task status on the server.')
      }
      const data = await response.json()
      console.log(data);
      dispatch(updateIsCompleted({ id }))
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// export const editTaskOnServer = createAsyncThunk(
//   'tasks/deleteTodo',
//   async (id, { rejectWithValue, dispatch }) => {
//     try {
//       const response = await fetch('https://jsonplaceholder.typicode.com/todos/' + id, {
//         method: 'DELETE'
//       })
//       if (!response.ok) {
//         throw new Error('Error deleting task. Server error.')
//       }
//       dispatch(deleteTask({ id }))
//     } catch (error) {
//       return rejectWithValue(error.message)
//     }
//   }
// )

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