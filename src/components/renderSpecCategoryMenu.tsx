import { MenuItem } from "@mui/material"

export const renderSpecMenuItems = (obj: any) => {
    return (
      <MenuItem key={obj.id} value={obj.id}>
        {obj.name}
      </MenuItem>
    )
  }