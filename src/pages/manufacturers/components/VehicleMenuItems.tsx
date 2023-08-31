import { Typography } from '@mui/material'
import { ParentMenuItem } from 'src/pages/vehicle-class/components/StatusMenuItems'

export const renderVehicleClassItems = (obj: any) => {
  return (
    <ParentMenuItem key={obj.id} value={obj.title}>
      <Typography>{obj.title}</Typography>
    </ParentMenuItem>
  )
}
