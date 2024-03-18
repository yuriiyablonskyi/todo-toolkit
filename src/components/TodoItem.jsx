import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Checkbox, IconButton, TextField } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteTaskOnServer, updateTaskPropertyOnServer } from '../store/tasks/tasksActions'

const TodoItem = ({ id, title, completed }) => {
  const [inputValue, setInputValue] = useState(title)
  const [isEditing, setIsEditing] = useState(false)

  const dispatch = useDispatch()

  const handleEditTask = () => {
    setIsEditing(!isEditing)
    isEditing && dispatch(updateTaskPropertyOnServer({ id, property: 'title', value: inputValue }))
  }

  return (
    <Box
      sx={{
        backgroundColor: '#cae2ff',
        padding: { xs: '8px 14px', sm: '14px' },
        borderRadius: '30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px'
      }}>
      <Box sx={{ borderRadius: '20px', overflow: 'hidden', display: 'inline-block' }}>
        <Checkbox
          color="success"
          sx={{
            '& .MuiSvgIcon-root': {
              xs: { fontSize: 25, marginRight: 10 },
              sm: { fontSize: 35, marginRight: 20 }
            }
          }}
          checked={completed}
          onChange={() => dispatch(updateTaskPropertyOnServer({ id, property: 'completed', value: !completed }))}
        />
      </Box>
      <TextField
        id="outlined-basic"
        variant="outlined"
        sx={{
          'input': { padding: { xs: '5px 8px', sm: '12px 18px' } },
          backgroundColor: '#fafafa',
          maxWidth: '500px',
          width: '100%',
          borderRadius: '20px',
          'fieldset': { borderRadius: '20px' }
        }}
        value={inputValue}
        disabled={!isEditing}
        onInput={({ target }) => setInputValue(target.value)}
      />
      <Box sx={{
        marginLeft: '5px',
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'row'
      }}>
        <IconButton aria-label="edit" sx={{
          marginRight: { sm: '10px', xs: '5px' },
          backgroundColor: '#fafafa',
          height: { sm: '40px', xs: '28px' },
          width: { sm: '40px', xs: '28px' }
        }} onClick={handleEditTask}>
          <EditIcon sx={{
            color: '#a089fe',
            height: { sm: '24px', xs: '16px' },
            width: { sm: '24px', xs: '16px' }
          }} />
        </IconButton>
        <IconButton aria-label="delete" sx={{
          backgroundColor: '#fafafa',
          height: { sm: '40px', xs: '28px' },
          width: { sm: '40px', xs: '28px' }
        }}
          onClick={() => dispatch(deleteTaskOnServer(id))}>
          <DeleteForeverIcon
            sx={{ color: '#ed6666', height: { sm: '24px', xs: '16px' }, width: { sm: '24px', xs: '16px' } }} />
        </IconButton>
      </Box>
    </Box>
  )
}

export default TodoItem