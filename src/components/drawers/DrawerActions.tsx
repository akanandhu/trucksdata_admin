import { Button, Grid } from '@mui/material'
import React from 'react'

const DrawerActions = ({ addDisabled, handleClose }: { addDisabled?: boolean; handleClose: () => void }) => {
  return (
    <Grid marginY={3}>
      <Button disabled={addDisabled} type='submit' variant='contained' sx={{ mr: 4 }}>
        Add
      </Button>
      <Button variant='outlined' color='secondary' onClick={handleClose}>
        Cancel
      </Button>
    </Grid>
  )
}

export default DrawerActions
