import AddCircleIcon from '@mui/icons-material/AddCircle'
import { Box, Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewTaskOnServer } from '../store/tasks/tasksActions'

const TodoCreator = () => {
  const [inputValue, setInputValue] = useState('')
  const dispatch = useDispatch()


  const handleAddTask = () => {
    const lengthValue = inputValue.trim().length
    if (lengthValue < 5) {
      return alert(`You are missing ${ 5 - lengthValue } characters. Minimum length is 5`)
    }

    const newTask = {
      id: Math.random().toString(16).slice(2) + new Date().getTime().toString(36),
      title: inputValue,
      completed: false
    }
    dispatch(addNewTaskOnServer({ newTask }))
    setInputValue('')
  }

  return (
    <Box
      sx={ {
        backgroundColor: '#99c0f0',
        padding: { xs: '8px 14px', sm: '20px 30px' },
        borderRadius: '30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
      } }>
      <TextField
        id="outlined-basic"
        placeholder="Write something here..."
        variant="outlined"
        sx={ {
          'input': { padding: { xs: '5px 8px', sm: '12px 18px' } },
          backgroundColor: '#fafafa',
          width: '100%',
          borderRadius: '20px',
          'fieldset': { borderRadius: '20px' }
        } }
        value={ inputValue }
        onInput={ ({ target }) => setInputValue(target.value) }
      />

      <Button sx={ { display: { xs: 'flex', md: 'none' } } }>
        <AddCircleIcon sx={ { fontSize: 33, marginLeft: '10px' } }/>
      </Button>
      <Button variant="contained" sx={ {
        backgroundColor: '#2e3b7e',
        fontSize: '16px',
        width: '180px',
        fontWeight: '400',
        textTransform: 'capitalize',
        borderRadius: '20px',
        height: '50px',
        display: { xs: 'none', md: 'inline-flex' },
        marginLeft: '10px'
      } }
              onClick={ handleAddTask }
              endIcon={ <AddCircleIcon style={ { fontSize: 34 } }/> }
      >
        Add task

      </Button>
    </Box>
  )
}

export default TodoCreator
