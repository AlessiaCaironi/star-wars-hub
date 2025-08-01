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
