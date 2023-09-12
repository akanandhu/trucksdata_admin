import { Grid } from '@mui/material'
import React, { Fragment } from 'react'
import TextFormField from 'src/components/input-fields/TextFormField'


const SpecificationForm = ({ control }: { control: any }) => {
  return (
    <Fragment>
      <Grid item xs={12} sm={6}>
        <TextFormField control={control} id='name' label='Engine Model' required size='medium' />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFormField control={control} id='power' type='number' label='Maximum Power (kW)' required size='medium' />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFormField
          control={control}
          id='torque'
          type='number'
          label='Maximum Torque (N-m)'
          required
          size='medium'
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFormField
          control={control}
          id='cylinders'
          type='number'
          label='No Of Cylinders, Displacement (cc)'
          required
          size='medium'
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFormField
          control={control}
          id='emission_standard'
          type='number'
          label='Emission Standard'
          required
          size='medium'
        />
      </Grid>
      
      <Grid item xs={12} sm={6}>
        <TextFormField control={control} id='engine_control' label='Engine Control' size='medium' />
      </Grid>
    </Fragment>
  )
}

export default SpecificationForm
