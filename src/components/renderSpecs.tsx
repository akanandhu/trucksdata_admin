import { MenuItem } from '@mui/material'
import React from 'react'

const renderSpecs = (obj: any) => {

  return (
    <MenuItem key={obj?.id} value={obj?.specification_id}>
        {obj?.specification?.name}
      </MenuItem>
  )
}

export default renderSpecs
