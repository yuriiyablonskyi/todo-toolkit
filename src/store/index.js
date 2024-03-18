import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './tasks/tasksSlice'
import userReducer from './user/userSlice'

export default configureStore({
  reducer: {
    tasks: todoReducer,
    user: userReducer
  }
})