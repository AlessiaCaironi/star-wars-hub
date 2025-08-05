import { createTheme } from '@mui/material'

/**
 * Dark theme configuration.
 */
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFE81F',
    },
    secondary: {
      main: '#394A59',
    },
    background: {
      default: '#0D1117',
      paper: '#161B22',
    },
    text: {
      primary: '#F0F6FC',
      secondary: '#8B949E',
    },
  },
})
