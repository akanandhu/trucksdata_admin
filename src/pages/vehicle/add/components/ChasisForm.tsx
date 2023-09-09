import { Grid } from '@mui/material'
import React, { Fragment } from 'react'
import TextFormField from 'src/components/input-fields/TextFormField'

const ChasisForm = ({ control }: { control: any }) => {
  return (
    <Fragment>
      <Grid item xs={12} sm={6}>
        <TextFormField control={control} id='frame_size' label='Frame Size (mm)' required size='medium' />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFormField control={control} id='front' type='number' label='Front Suspension' required size='medium' />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFormField control={control} id='rear' type='number' label='Rear Suspension' required size='medium' />
      </Grid>
    </Fragment>
  )
}

export default ChasisForm
