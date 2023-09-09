import { Grid } from '@mui/material'
import React, { Fragment } from 'react'
import TextFormField from 'src/components/input-fields/TextFormField'

const TyreForm = ({ control }: { control: any }) => {
  return (
    <Fragment>
      <Grid item xs={12} sm={6}>
        <TextFormField control={control} id='tyre_size' label='Tyre Size' size='medium' />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFormField control={control} id='wheels' type='number' label='Number of Wheels' size='medium' />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFormField control={control} id='tyres' type='number' label='Number of Tyres' size='medium' />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFormField control={control} id='front_track' type='number' label='Front Track' size='medium' />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFormField control={control} id='rear_track' type='number' label='Rear Track' size='medium' />
      </Grid>
    </Fragment>
  )
}

export default TyreForm
