import { Typography } from '@mui/material'
import React from 'react'
import { ParentMenuItem } from 'src/components/renderStatusMenuItems'

export const renderParentMenuItems = ({ obj }: { obj: any }) => {
  const isParent = !!obj?.children
  const hasChild = obj?.children?.length > 0

  return (
    <ParentMenuItem disabled={hasChild} key={obj.id} value={obj.id}>
      <Typography paddingLeft={isParent ? 0 : 3} fontSize={isParent ? 16 : 14} fontWeight={isParent ? 600 : 500}>
        {obj.account_name}{' '}
        {obj?.children && (
          <Typography fontSize={12} fontStyle={'italic'}>
            ({obj?.children})
          </Typography>
        )}
      </Typography>
    </ParentMenuItem>
  )
}
