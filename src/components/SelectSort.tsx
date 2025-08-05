import { MenuItem, Select, Stack, Typography } from '@mui/material'

export type SortOption = 'release' | 'episode' | 'title'

interface SelectSortFilmProps {
  value: SortOption
  // eslint-disable-next-line no-unused-vars
  onChange: (value: SortOption) => void
}

/**
 * SelectSortFilm is a dropdown component to select the sorting criteria.
 *
 * @param value - The currently selected sort option.
 * @param onChange - Callback function triggered when the selected option changes.
 *
 * @component
 * @returns A Material-UI Stack component containing a Select dropdown for sorting options.
 */
const SelectSortFilm = ({ value, onChange }: SelectSortFilmProps) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="flex-end"
    >
      <Typography variant="subtitle1">Sort by</Typography>
      <Select
        size="small"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
      >
        <MenuItem value="episode">Episode</MenuItem>
        <MenuItem value="release">Release Date</MenuItem>
        <MenuItem value="title">Title</MenuItem>
      </Select>
    </Stack>
  )
}

export default SelectSortFilm
