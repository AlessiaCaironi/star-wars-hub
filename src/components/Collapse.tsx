import { ExpandMore } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material'
import type { ReactNode } from 'react'

interface ICollapse {
  title: string
  content: ReactNode
}

/**
 * Collapse component is a panel component that displays a title and expandable content.
 *
 * @param title - The title displayed in the collapsed state.
 * @param content - The content shown when the panel is expanded.
 *
 * @component
 * @returns A Material-UI Accordion component with summary and details.
 */
const Collapse = ({ title, content }: ICollapse) => (
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMore />}
      aria-controls="panel1-content"
    >
      <Typography component="span">{title}</Typography>
    </AccordionSummary>
    <AccordionDetails>{content}</AccordionDetails>
  </Accordion>
)

export default Collapse
