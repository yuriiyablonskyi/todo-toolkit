import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Box, Checkbox, IconButton, TextField } from "@mui/material"
import { useDispatch } from 'react-redux'
import { updateIsCompleted, editTask, deleteTask } from '../store/todoStore'
import { useEffect, useState } from 'react'

const TodoItem = ({ id, title, completed }) => {
  const [inputValue, setInputValue] = useState(title)
  const [isEditing, setIsEditing] = useState(false)

  const dispatch = useDispatch()

  const handleEditTask = () => {
    setIsEditing(!isEditing)
    isEditing && dispatch(editTask({ text: inputValue, id }))
  }

  return (
    <Box
      sx={{
        backgroundColor: '#cae2ff',
        padding: '20px 30px',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px'
      }} >
      <Checkbox color="success"
        sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }}
        checked={completed}
        onChange={() => dispatch(updateIsCompleted({ id, completed: !completed }))}
      />
      <TextField
        id="outlined-basic"
        variant="outlined"
        sx={{ backgroundColor: '#fafafa', maxWidth: '500px', width: '100%' }}
        value={inputValue}
        disabled={!isEditing}
        onInput={({ target }) => setInputValue(target.value)}
      />
      <IconButton aria-label="edit" sx={{ backgroundColor: '#fafafa' }} onClick={handleEditTask}>
        <EditIcon sx={{ color: '#a089fe' }} />
      </IconButton>
      <IconButton aria-label="delete" sx={{ backgroundColor: '#fafafa' }} onClick={() => dispatch(deleteTask({ id }))}>
        <DeleteForeverIcon sx={{ color: '#ed6666' }} />
      </IconButton>
    </Box >
  )
}

export default TodoItem