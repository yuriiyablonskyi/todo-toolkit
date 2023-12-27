import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Box, Checkbox, IconButton, TextField } from "@mui/material"
import { useDispatch } from 'react-redux'
import { updateIsCompleted, editTask, deleteTaskOnServer } from '../store/todoStore'
import { useEffect, useState } from 'react'
import styled from '@emotion/styled'

const TodoItemStyled = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  padding: '20px 30px',
  borderRadius: '30px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '8px'
}))


const TodoItem = ({ id, title, completed }) => {
  const [inputValue, setInputValue] = useState(title)
  const [isEditing, setIsEditing] = useState(false)

  const dispatch = useDispatch()

  const handleEditTask = () => {
    setIsEditing(!isEditing)
    isEditing && dispatch(editTask({ text: inputValue, id }))
  }

  return (
    <TodoItemStyled>
      <Box sx={{ borderRadius: '20px', overflow: 'hidden', display: 'inline-block' }}>
        <Checkbox
          color="success"
          sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }}
          checked={completed}
          onChange={() => dispatch(updateIsCompleted({ id, completed: !completed }))}
        />
      </Box>
      <TextField
        id="outlined-basic"
        variant="outlined"
        sx={{ backgroundColor: '#fafafa', maxWidth: '500px', width: '100%', borderRadius: '20px', 'fieldset': { borderRadius: '20px' } }}
        value={inputValue}
        disabled={!isEditing}
        onInput={({ target }) => setInputValue(target.value)}
      />
      <IconButton aria-label="edit" sx={{ backgroundColor: '#fafafa' }} onClick={handleEditTask}>
        <EditIcon sx={{ color: '#a089fe', 'svg': { height: '50px' } }} />
      </IconButton>
      <IconButton aria-label="delete" sx={{ backgroundColor: '#fafafa' }} onClick={() => dispatch(deleteTaskOnServer(id))}>
        <DeleteForeverIcon sx={{ color: '#ed6666' }} />
      </IconButton>
    </TodoItemStyled >
  )
}

export default TodoItem