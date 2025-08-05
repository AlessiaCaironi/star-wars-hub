import { CircularProgress, Grid } from '@mui/material'

/**
 * Loading component. Displays a circular progress spinner.
 *
 * @component
 * @returns A centered loading spinner.
 */
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
