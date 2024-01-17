import { createSlice } from '@reduxjs/toolkit'

const todosSlice = createSlice({
  name: 'user',
  initialState: {
    user: 'Vlada'
  }
})

export default todosSlice.reducer
