import { Grid } from '@mui/material'
import React, { Fragment } from 'react'
import SelectFormField from 'src/components/input-fields/SelectFormField'
import TextFormField from 'src/components/input-fields/TextFormField'
import { cabinTypes, loadingSpan, payloadRange } from 'src/fake-data/vehicles'
import { renderMenuItemsTitle } from 'src/components/renderMenuItemsTitle'

const VehicleDimensionsForm = ({ control }: { control: any }) => {
  return (
    <Fragment>
      <Grid item xs={12} sm={6}>
        <TextFormField
          control={control}
          type='number'
          id='vehicle_weight'
          label='Gross Vehicle Weight (Kg)'
          size='medium'
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFormField
          control={control}
          type='number'
          id='kerb_weight'
          label='Kerb Weight (Range) (Kg)'
          size='medium'
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SelectFormField
          label='Payload (Range) (Kg)'
          data={payloadRange}
          required
          size={'medium'}
          renderMenuItems={renderMenuItemsTitle}
          control={control}
          id='vehicle_class'
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SelectFormField
          label='Loading Span (ft) / Loading Capacity (Cu.M)'
          data={loadingSpan}
          required
          size={'medium'}
          renderMenuItems={renderMenuItemsTitle}
          control={control}
          id='vehicle_class'
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFormField control={control} type='number' id='wheel_base' label='Wheel Base (mm)' size='medium' />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SelectFormField
          label='Cabin Type'
          data={cabinTypes}
          required
          size={'medium'}
          renderMenuItems={renderMenuItemsTitle}
          control={control}
          id='vehicle_class'
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFormField control={control} type='number' id='overall_length' label='Overall Length (mm)' size='medium' />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFormField control={control} type='number' id='overall_width' label='Overall Width (mm)' size='medium' />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFormField control={control} type='number' id='overall_height' label='Overall Height (mm)' size='medium' />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFormField control={control} type='number' id='front_overhand' label='Front Overhang (mm)' size='medium' />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFormField control={control} type='number' id='rear_overhand' label='Rear Overhang (mm)' size='medium' />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFormField
          control={control}
          type='number'
          id='ground_clearance'
          label='Ground Clearance (mm)'
          size='medium'
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFormField
          control={control}
          type='number'
          id='cargo_box_ref'
          label='Cargo Box Ref Dimensions (mm)'
          size='medium'
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFormField
          control={control}
          type='number'
          id='fuel_tank_capacity'
          label='Fuel Tank Capacity'
          size='medium'
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFormField
          control={control}
          type='number'
          id='fuel_tank_material'
          label='Fuel Tank Material'
          size='medium'
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFormField control={control} type='number' id='adblue_capacity' label='Ad Blue Capacity' size='medium' />
      </Grid>
    </Fragment>
  )
}

export default VehicleDimensionsForm
