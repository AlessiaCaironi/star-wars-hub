import { CircularProgress, Grid } from '@mui/material'

const Loading = () => (
  <Grid
    container
    justifyContent="center"
    alignItems="center"
    style={{ minHeight: '50vh' }}
  >
    <CircularProgress />
  </Grid>
)

export default Loading
