import { Box, Container, Skeleton, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TodoCreator from './components/TodoCreator.jsx'
import TodoItem from './components/TodoItem.jsx'
import { fetchTodos } from './store/tasks/tasksActions.js'
import { tasksData, userData } from './store/todoSelectors.js'

const App = () => {
  const dispatch = useDispatch()
  const { tasks, loading } = useSelector(tasksData)
  const userName = useSelector(userData)

  const dataLodaded = loading === 'idle'

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  return (
    <Container sx={ { paddingTop: 4 } }>
      <Typography variant="h6" component="h2" color="#2e3b7e" sx={ { fontWeight: '500' } }>Hi, { userName }</Typography>
      <Box sx={ { maxWidth: '730px', margin: '0 auto' } }>
        <Typography variant="h3" component="h1" color="#2e3b7e" align="center"
                    sx={ { fontWeight: '500', marginBottom: '16px' } }>To do list</Typography>
        <TodoCreator/>
        { dataLodaded ?
          tasks.map(({ id, title, completed }) => (
            <TodoItem title={ title } key={ id } completed={ completed } id={ id }/>
          ))
          :
          [...Array(3)].map((_, index) => (
            <Skeleton animation="wave" variant="rounded" key={ index } sx={ {
              height: { xs: '59px', sm: '81px' },
              maxWidth: '730px',
              marginBottom: ' 8px',
              borderRadius: '30px'
            } }/>
          ))
        }
      </Box>
    </Container>
  )
}

export default App
