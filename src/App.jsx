import TodoCreator from './components/TodoCreator.jsx'
import TodoItem from './components/TodoItem.jsx'
import { Box, Container, Typography } from '@mui/material'

const tasks = [
  { id: 1, text: 'first task', isDone: true },
  { id: 2, text: 'second task', isDone: true },
  { id: 3, text: 'third task', isDone: false }
]

const App = () => {
  return (
    <Container sx={{ paddingTop: 4 }} >
      <Typography variant="h4" component="h2" color='#2e3b7e' sx={{ fontWeight: '500' }}>Hi, Alex</Typography>
      <Box sx={{ width: '730px', margin: '0 auto' }}>
        <Typography variant="h3" component="h1" color='#2e3b7e' align='center' sx={{ fontWeight: '500', marginBottom: '16px' }}>To do list</Typography>
        <TodoCreator />
        {tasks.map(({ id, text, isDone }) => (
          <TodoItem text={text} key={id} isDone={isDone} id={id} />
        ))}
      </Box>
    </Container >
  )
}

export default App
