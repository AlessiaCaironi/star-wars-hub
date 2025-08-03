import { Stack, Typography } from '@mui/material'

interface InfoRowProps {
  label: string
  value: string
}

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
