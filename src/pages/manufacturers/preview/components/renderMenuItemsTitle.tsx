import { MenuItem } from "@mui/material"

export const renderMenuItemsTitle = (obj: any) => {
    return (
      <MenuItem key={obj.id} value={obj.id}>
        {obj.title}
      </MenuItem>
    )
  }