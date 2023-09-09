import { Grid } from '@mui/material'
import React, { Fragment } from 'react'
import SelectFormField from 'src/components/input-fields/SelectFormField'
import TextFormField from 'src/components/input-fields/TextFormField'
import { steeringTypes } from 'src/fake-data/vehicles'
import { renderMenuItemsTitle } from 'src/pages/manufacturers/preview/components/renderMenuItemsTitle'

const SteeringBreakingForm = ({ control }: { control: any }) => {
  return (
    <Fragment>
      <Grid item xs={12} sm={6}>
        <SelectFormField
          label='Steering Type'
          data={steeringTypes}
          size={'medium'}
          renderMenuItems={renderMenuItemsTitle}
          control={control}
          id='steering_type'
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFormField control={control} id='service brake' label='Service Brake' size='medium' />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFormField control={control} id='parking brake' label='Parking Brake' size='medium' />
      </Grid>
    </Fragment>
  )
}

export default SteeringBreakingForm
