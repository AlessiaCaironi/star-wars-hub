import { Chip } from '@mui/material'
import { ResourcesType } from 'swapi-ts'

interface ContentTypeChipProps {
  type: ResourcesType
}

/**
 * Returns a human-readable label for a given resource type.
 *
 * @param resourceType - The type of resource from the `ResourcesType` enum.
 * @returns The corresponding label as a string, or 'Unknown Type' if the type is not recognized.
 */
const getChipLabel = (resourceType: ResourcesType) => {
  switch (resourceType) {
    case ResourcesType.Films:
      return 'Film'
    case ResourcesType.People:
      return 'Character'
    case ResourcesType.Planets:
      return 'Planet'
    case ResourcesType.Species:
      return 'Species'
    case ResourcesType.Starships:
      return 'Starship'
    case ResourcesType.Vehicles:
      return 'Vehicle'
    default:
      return 'Unknown Type'
  }
}

/**
 * Renders a Material-UI Chip component displaying the label for a given resource type.
 *
 * @component
 * @param type - The type of the resource to display on the chip.
 * @returns A Chip component positioned absolutely in the top-right corner.
 */
const ContentTypeChip = ({ type }: ContentTypeChipProps) => {
  return (
    <Chip
      label={getChipLabel(type)}
      variant="outlined"
      color="primary"
      size="medium"
      sx={{
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 1,
      }}
    />
  )
}

export default ContentTypeChip
