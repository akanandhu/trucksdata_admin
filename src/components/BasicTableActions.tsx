import { Icon } from '@iconify/react'
import { Box, IconButton, Tooltip } from '@mui/material'
import React from 'react'

const BasicTableActions = ({
  handleEdit,
  handleDelete,
  handleView,
  marginY,
  paddingY,
}: {
  handleEdit?: () => void
  handleDelete?: () => void
  handleView?: () => void
  marginY?: number
  paddingY?: number
}) => {
  return (
    <Box marginY={marginY ?? 0} paddingY={paddingY ?? 0} sx={{ display: 'flex', alignItems: 'center' }}>
      {handleView &&  (
        <Tooltip title='View'>
          <IconButton onClick={handleView} size='small' sx={{ color: 'text.secondary' }}>
            <Icon icon='tabler:eye' fontSize={'1.35rem'} />
          </IconButton>
        </Tooltip>
      )}
      {handleEdit && <Tooltip title='Edit'>
        <IconButton onClick={handleEdit} size='small' sx={{ color: 'text.secondary' }}>
          <Icon icon='tabler:edit' fontSize={'1.35rem'} />
        </IconButton>
      </Tooltip>}
      {handleDelete && (
        <Tooltip title='Delete'>
          <IconButton onClick={handleDelete} size='small' sx={{ color: 'text.secondary' }}>
            <Icon icon='tabler:trash' fontSize={'1.35rem'} />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  )
}

export default BasicTableActions
