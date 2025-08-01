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

const UnorderedList = ({ items, resourceType }: UnorderedListProps) => {
  const navigate = useNavigate()

  return (
    <List dense disablePadding>
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
