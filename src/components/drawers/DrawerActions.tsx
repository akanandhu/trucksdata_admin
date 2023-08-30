import { Button, Grid } from '@mui/material'
import React from 'react'

const DrawerActions = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <Grid marginY={3}>
      <Button type='submit' variant='contained' sx={{ mr: 4 }}>
        Add
      </Button>
      <Button variant='outlined' color='secondary' onClick={handleClose}>
        Cancel
      </Button>
    </Grid>
  )
}

export default DrawerActions
