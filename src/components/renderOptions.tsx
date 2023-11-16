import { MenuItem } from '@mui/material'

export const renderOptions = (obj: { id: string; option: string }) => {
  return (
    <MenuItem key={obj.id} value={obj.option}>
      {obj.option}
    </MenuItem>
  )
}
