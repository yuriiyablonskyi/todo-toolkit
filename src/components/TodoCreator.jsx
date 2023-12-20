import { Box, Button, TextField } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';

const TodoCreator = () => {
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
      />
      <Button variant="contained" sx={{
        backgroundColor: '#2e3b7e',
        fontSize: '16px',
        fontWeight: '400',
        textTransform: 'capitalize'
      }}>
        Add task
        <AddCircleIcon sx={{ fontSize: 33, marginLeft: '10px' }} />
      </Button>
    </Box >
  )
}

export default TodoCreator