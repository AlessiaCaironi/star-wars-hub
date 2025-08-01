import { Container } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { routes } from './router/config'
import Router from './router/Router'

const App = () => {
  return (
    <>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" component="div">
            Star Wars Hub
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Router routes={routes} />
      </Container>
    </>
  )
}

export default App
