import { MenuItem, Typography } from '@mui/material'

export const renderVehicleClassItems = (obj: any) => {
  return (
    <MenuItem key={obj.id} value={obj.title}>
      <Typography>{obj.title}</Typography>
    </MenuItem>
  )
}
