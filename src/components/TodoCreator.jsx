import { Box, Button, TextField } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { addNewTask } from '../store/todoStore'

const TodoCreator = () => {
  const [inputValue, setInputValue] = useState('')
  const dispatch = useDispatch()


  const handleAddTask = () => {
    const lengthValue = inputValue.trim().length
    if (lengthValue < 5) {
      return alert(`You are missing ${5 - lengthValue} characters. Minimum length is 5`)
    }

    const newTask = {
      id: Math.random().toString(16).slice(2) + new Date().getTime().toString(36),
      title: inputValue,
      completed: false
    }
    dispatch(addNewTask({ newTask }))
    setInputValue('')
  }

  return (
    <Box
      sx={{
        backgroundColor: '#99c0f0',
        padding: '20px 30px',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
      }} >
      <TextField
        id="outlined-basic"
        placeholder='Write something here...'
        variant="outlined"
        sx={{ backgroundColor: '#fafafa', maxWidth: '500px', width: '100%' }}
        value={inputValue}
        onInput={({ target }) => setInputValue(target.value)}
      />
      <Button variant="contained" sx={{
        backgroundColor: '#2e3b7e',
        fontSize: '16px',
        fontWeight: '400',
        textTransform: 'capitalize'
      }}
        onClick={handleAddTask}>
        Add task
        <AddCircleIcon sx={{ fontSize: 33, marginLeft: '10px' }} />
      </Button>
    </Box >
  )
}

export default TodoCreator