import { createSlice } from '@reduxjs/toolkit'

const todosSlice = createSlice({
  name: 'user',
  initialState: {
    user: 'Alex'
  }
})

export default todosSlice.reducer
