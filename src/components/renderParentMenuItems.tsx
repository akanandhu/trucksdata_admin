import { MenuItem } from '@mui/material'
import React from 'react'

export const renderParentMenuItems = (obj: any) => {
  const isParent = obj?.child_options?.length

  return (
    <MenuItem
      sx={{ fontWeight: isParent ? 900 : 400, fontSize: isParent ? '1.25rem' : '1rem', paddingLeft: isParent ? 0 : 3 }}
      key={obj?.id}
      value={obj.option}
    >
      {obj.option}
    </MenuItem>
  )
}
