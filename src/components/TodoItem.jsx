import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Box, Checkbox, IconButton, TextField } from "@mui/material"

const TodoItem = ({ id, text, isDone }) => {

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
      <Checkbox defaultChecked color="success"
        sx={{ '& .MuiSvgIcon-root': { fontSize: 35 } }}
      />
      <TextField
        id="outlined-basic"
        variant="outlined"
        value={text}
        sx={{ backgroundColor: '#fafafa', maxWidth: '500px', width: '100%' }}
      />
      <IconButton aria-label="edit" sx={{ backgroundColor: '#fafafa' }}>
        <EditIcon sx={{ color: '#a089fe' }} />
      </IconButton>
      <IconButton aria-label="delete" sx={{ backgroundColor: '#fafafa' }}>
        <DeleteForeverIcon sx={{ color: '#ed6666' }} />
      </IconButton>
    </Box >
  )
}

export default TodoItem