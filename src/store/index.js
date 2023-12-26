import { configureStore } from "@reduxjs/toolkit"
import todoReducer from './todoStore'
import userReducer from './userStore'

export default configureStore({
  reducer: {
    tasks: todoReducer,
    user: userReducer
  }
})