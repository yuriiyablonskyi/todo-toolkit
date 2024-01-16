import { useEffect } from 'react'
import { Box, Container, Skeleton, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos } from './store/tasks/tasksActions.js'
import { tasksData, userData, statusTasksData } from './store/todoSelectors.js'
import TodoCreator from './components/TodoCreator.jsx'
import TodoItem from './components/TodoItem.jsx'

const App = () => {
  const dispatch = useDispatch()
  const tasks = useSelector(tasksData)
  const userName = useSelector(userData)
  const statusLoadingData = useSelector(statusTasksData)

  const dataLodaded = statusLoadingData === 'idle'

  useEffect(() => {
    dispatch(fetchTodos())
  }, [''])

  return (
    <Container sx={{ paddingTop: 4 }} >
      <Typography variant='h6' component='h2' color='#2e3b7e' sx={{ fontWeight: '500' }}>Hi, {userName}</Typography>
      <Box sx={{ maxWidth: '730px', margin: '0 auto' }}>
        <Typography variant='h3' component='h1' color='#2e3b7e' align='center' sx={{ fontWeight: '500', marginBottom: '16px' }}>To do list</Typography>
        <TodoCreator />
        {dataLodaded ?
          tasks.map(({ id, title, completed }) => (
            <TodoItem title={title} key={id} completed={completed} id={id} />
          ))
          :
          <>
            <Skeleton animation="wave" variant="rounded" width={730} height={81} sx={{ marginBottom: ' 8px', borderRadius: '30px' }} />
            <Skeleton animation="wave" variant="rounded" width={730} height={81} sx={{ marginBottom: ' 8px', borderRadius: '30px' }} />
            <Skeleton animation="wave" variant="rounded" width={730} height={81} sx={{ marginBottom: ' 8px', borderRadius: '30px' }} />
            <Skeleton animation="wave" variant="rounded" width={730} height={81} sx={{ marginBottom: ' 8px', borderRadius: '30px' }} />
            <Skeleton animation="wave" variant="rounded" width={730} height={81} sx={{ marginBottom: ' 8px', borderRadius: '30px' }} />
            <Skeleton animation="wave" variant="rounded" width={730} height={81} sx={{ marginBottom: ' 8px', borderRadius: '30px' }} />
            <Skeleton animation="wave" variant="rounded" width={730} height={81} sx={{ marginBottom: ' 8px', borderRadius: '30px' }} />
            <Skeleton animation="wave" variant="rounded" width={730} height={81} sx={{ marginBottom: ' 8px', borderRadius: '30px' }} />
          </>
        }
      </Box>
    </Container >
  )
}

export default App
