import { Grid } from '@mui/material'
import React from 'react'
import TextFormField from 'src/components/input-fields/TextFormField'

const OtherDetailsForm = ({control}:{control: any}) => {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <TextFormField control={control} id='air_conditioning'  label='Air Conditioning' size='medium' />
      </Grid>
    </>
  )
}

export default OtherDetailsForm
