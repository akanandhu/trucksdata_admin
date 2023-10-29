import { MenuItem } from '@mui/material'

export const renderMenu = (obj: { id: string; name: string }) => {
  return (
    <MenuItem key={obj.id} value={obj.id}>
      {obj.name}
    </MenuItem>
  )
}
