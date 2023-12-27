import { Box, Button, TextField } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { addNewTask } from '../store/todoStore'
import styled from '@emotion/styled'

const TodoCreatorStyled = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  padding: '20px 30px',
  borderRadius: '30px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px'
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  fontSize: '16px',
  fontWeight: '400',
  textTransform: 'capitalize',
  borderRadius: '20px',
  height: '50px'
}))

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
    <TodoCreatorStyled >
      <TextField
        id="outlined-basic"
        placeholder='Write something here...'
        variant="outlined"
        sx={{ backgroundColor: '#fafafa', maxWidth: '500px', width: '100%', borderRadius: '20px', 'fieldset': { borderRadius: '20px' } }}
        value={inputValue}
        onInput={({ target }) => setInputValue(target.value)}
      />
      <ButtonStyled variant="contained"
        onClick={handleAddTask}>
        Add task
        <AddCircleIcon sx={{ fontSize: 33, marginLeft: '10px' }} />
      </ButtonStyled>
    </TodoCreatorStyled >
  )
}

export default TodoCreator