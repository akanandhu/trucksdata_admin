import React from 'react'
import Header from '../Header'
import { IconButton, Typography } from '@mui/material'
import { Icon } from '@iconify/react'

const HeaderWithClose = ({ title, handleClose }: { title: string; handleClose: () => void }) => {
  return (
    <Header>
      <Typography variant='h6'>{title}</Typography>
      <IconButton
        size='small'
        onClick={handleClose}
        sx={{ borderRadius: 1, color: 'text.primary', backgroundColor: 'action.selected' }}
      >
        <Icon icon='tabler:x' fontSize='1.125rem' />
      </IconButton>
    </Header>
  )
}

export default HeaderWithClose
