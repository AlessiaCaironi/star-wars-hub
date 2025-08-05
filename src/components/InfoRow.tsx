import { Stack, Typography } from '@mui/material'

interface InfoRowProps {
  label: string
  value: string
}

/**
 * InfoRow component displays a label and its corresponding value
 *
 * @param label - The label describing the type of information (e.g., "Director", "Release date").
 * @param value - The value associated with the label to be displayed.
 *
 * @component
 * @returns A Material-UI Stack component displaying the label and value.
 */
const InfoRow = ({ label, value }: InfoRowProps) => (
  <Stack direction="row" spacing={1}>
    <Typography variant="body1" fontWeight="bold">
      {label}:
    </Typography>
    <Typography
      variant="body1"
      color="text.secondary"
      align="justify"
      sx={{ display: 'block' }}
    >
      {value}
    </Typography>
  </Stack>
)

export default InfoRow
