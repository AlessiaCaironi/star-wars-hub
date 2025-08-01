import { List, ListItemButton, ListItemText } from '@mui/material'
import type {
  IFilm,
  IPeople,
  IPlanet,
  ISpecie,
  IStarship,
  IVehicle,
} from 'swapi-ts'

interface UnorderedListProps {
  items: IFilm[] | IPeople[] | IPlanet[] | ISpecie[] | IStarship[] | IVehicle[]
}

const UnorderedList = ({ items }: UnorderedListProps) => (
  <List dense disablePadding>
    {items.map((item) => {
      // Film does not have "name"
      const label = 'title' in item ? item.title : item.name
      return (
        <ListItemButton key={label} disableGutters>
          <ListItemText primary={label} />
        </ListItemButton>
      )
    })}
  </List>
)

export default UnorderedList
