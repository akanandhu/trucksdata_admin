import styled from '@emotion/styled'
import { MenuItem, MenuItemProps, Typography } from '@mui/material'

export const ParentMenuItem = styled(MenuItem)<MenuItemProps>(({}) => ({
  '&.Mui-disabled': {
    color: '#000000',
    opacity: 1
  }
}))

export const renderMenuItems = (obj: any) => {

  return (
    <ParentMenuItem key={obj.id} value={obj.id}>
      <Typography>
        {obj.status}
      </Typography>
    </ParentMenuItem>
  )
}
