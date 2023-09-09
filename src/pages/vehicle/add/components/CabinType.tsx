import { Grid } from '@mui/material'
import React from 'react'
import SelectFormField from 'src/components/input-fields/SelectFormField'
import TextFormField from 'src/components/input-fields/TextFormField'
import { VariantTypes, cabinTypes } from 'src/fake-data/vehicles'
import { renderMenuItemsTitle } from 'src/pages/manufacturers/preview/components/renderMenuItemsTitle'

const CabinForm = ({control}:{control: any}) => {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <SelectFormField
          label='Cabin Type'
          data={cabinTypes}
          required
          size={'medium'}
          renderMenuItems={renderMenuItemsTitle}
          control={control}
          id='cabin_type'
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFormField control={control} id='seating_capacity' type='number' label='Seating Capacity' size='medium' />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SelectFormField
          label='Variant Option'
          data={VariantTypes}
          required
          size={'medium'}
          renderMenuItems={renderMenuItemsTitle}
          control={control}
          id='variant_option'
        />
      </Grid>


      <Grid item xs={12} sm={6}>
        <TextFormField control={control} id='electrical'  label='Electrical' size='medium' />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFormField control={control} id='alternator'  label='Alternator' size='medium' />
      </Grid>
    </>
  )
}

export default CabinForm
