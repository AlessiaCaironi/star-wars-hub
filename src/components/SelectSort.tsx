import { MenuItem, Select, Stack, Typography } from '@mui/material'

export type SortOption = 'release' | 'episode' | 'title'

interface SelectSortProps {
  value: SortOption
  // eslint-disable-next-line no-unused-vars
  onChange: (value: SortOption) => void
}

const SelectSort = ({ value, onChange }: SelectSortProps) => {
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

export default SelectSort
