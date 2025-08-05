import { List, ListItemButton, ListItemText } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import type {
  IFilm,
  IPeople,
  IPlanet,
  ISpecie,
  IStarship,
  IVehicle,
  ResourcesType,
} from 'swapi-ts'

import { extractIdFromUrl } from '../utils/navigation'
import { buildPath, getLocation } from '../utils/navigation'

interface UnorderedListProps {
  items: IFilm[] | IPeople[] | IPlanet[] | ISpecie[] | IStarship[] | IVehicle[]
  resourceType: ResourcesType
}

/**
 * UnorderedList component renders an unordered list of items with clickable list buttons.
 * Each item navigates to a detail page based on its resource type and ID extracted from its URL.
 * The label for each item is determined by its "name" property (or "title" for films).
 * If no items are found, a message "No items found" is displayed.
 *
 * @param items - Array of resource items to display in the list.
 * @param resourceType - The type of resource being listed (one of ResourcesType).
 *
 * @component
 * @returns A Material UI List component containing clickable ListItemButtons for each item or a message if no items are present.
 */
const UnorderedList = ({ items, resourceType }: UnorderedListProps) => {
  const navigate = useNavigate()

  return (
    <List dense disablePadding>
      {items.length === 0 && <ListItemText primary="No items found" />}
      {items.map((item) => {
        // Film does not have "name"
        const label = 'title' in item ? item.title : item.name
        return (
          <ListItemButton
            key={label}
            disableGutters
            onClick={() => {
              const itemId = extractIdFromUrl(item.url)
              const location = getLocation(resourceType, true)
              const path = buildPath(location, {
                id: itemId,
              })
              navigate(path)
            }}
          >
            <ListItemText primary={label} />
          </ListItemButton>
        )
      })}
    </List>
  )
}

export default UnorderedList
