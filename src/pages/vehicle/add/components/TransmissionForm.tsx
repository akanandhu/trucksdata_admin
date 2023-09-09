import { Grid } from '@mui/material'
import React, { Fragment } from 'react'
import SelectFormField from 'src/components/input-fields/SelectFormField'
import TextFormField from 'src/components/input-fields/TextFormField'
import { clutchTypes, transmissionTypes } from 'src/fake-data/vehicles'
import { renderMenuItemsTitle } from 'src/pages/manufacturers/preview/components/renderMenuItemsTitle'

const TransmissionForm = ({control}:{control:any}) => {
  return (
    <Fragment>
            <Grid item xs={12} sm={6}>
                <TextFormField control={control} id='gear_box' label='Gear Box Model'  size='medium' />
            </Grid>
            <Grid item xs={12} sm={6}>
        <SelectFormField
          label='Transmission Type'
          data={transmissionTypes}
          size={'medium'}
          renderMenuItems={renderMenuItemsTitle}
          control={control}
          id='transmission_type'
        />
      </Grid>
            <Grid item xs={12} sm={6}>
                <TextFormField control={control} id='gears' type='number' label='Number of Gears'  size='medium' />
            </Grid>
            <Grid item xs={12} sm={6}>
            <SelectFormField
          label='Clutch Type'
          data={clutchTypes}
          size={'medium'}
          renderMenuItems={renderMenuItemsTitle}
          control={control}
          id='clutch_type'
        />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextFormField control={control} id='clutch_diameter' label='Clutch '  size='medium' />
            </Grid>
          </Fragment>
  )
}

export default TransmissionForm