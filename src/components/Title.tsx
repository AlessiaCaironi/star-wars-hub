import { Typography } from '@mui/material'

interface TitleProps {
  text: string
}

/**
 * Renders a title using Material-UI's Typography component.
 *
 * @param text - The text to display as the title.
 *
 * @component
 * @returns A Typography element with the provided text.
 */
const Title = ({ text }: TitleProps) => (
  <Typography variant="h6" gutterBottom>
    {text}
  </Typography>
)

export default Title
