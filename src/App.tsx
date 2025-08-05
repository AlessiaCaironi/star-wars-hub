import './App.css'

import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Toolbar,
} from '@mui/material'
import { BrowserRouter, Link } from 'react-router-dom'

import { routes } from './router/config'
import { locations } from './router/locations'
import Router from './router/Router'
import { darkTheme } from './theme'

/**
 * The main application component.
 *
 * Renders the top-level layout including the app bar with logo,
 * and sets up routing for the application using React Router.
 *
 * @returns {JSX.Element} The rendered application container.
 */
const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container>
        <BrowserRouter>
          <AppBar
            position="static"
            sx={{ mb: 1, mt: 1, background: 'none', boxShadow: 'none' }}
          >
            <Toolbar className="toolbar">
              <Box component={Link} to={locations.home} className="logo-link">
                <Box
                  component="img"
                  src="/star_wars_hub.png"
                  alt="Star Wars Hub"
                  className="logo-img"
                />
              </Box>
            </Toolbar>
          </AppBar>
          <Router routes={routes} />
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  )
}

export default App
