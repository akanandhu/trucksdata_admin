import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import ErrorBox from 'src/components/ErrorBox'
import DrawerActions from 'src/components/drawers/DrawerActions'
import TextFormField from 'src/components/input-fields/TextFormField'
import { rows } from 'src/fake-data/rows'
import { renderVehicleClassItems } from './VehicleMenuItems'
import MultipleSelectFormField from 'src/components/input-fields/MultipleSelectFormField'
import { Control } from 'react-hook-form'
import { ManufacturersFields } from 'src/types/Manufacturers'

const ManufacturersForm = ({handleClose,errors, control}:{handleClose: () => void, control: Control<ManufacturersFields>, errors: any}) => {

  return (
    <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
      <form>
        <Grid container spacing={5}>
            <Grid item xs={12}>
                <Typography>Image Input Here</Typography>
            </Grid>
          <Grid item xs={12}>
            <TextFormField id='title' label='Manufacturer Brand Name' size='medium' required control={control} />
            {errors && <ErrorBox error={errors?.title} />}
          </Grid>
          <Grid item xs={12}>
           <MultipleSelectFormField id='vehicle_classes' control={control} data={rows}  label='Vehicle Class' renderMenuItems={renderVehicleClassItems}  />
          </Grid>
        </Grid>
      </form>
      <DrawerActions handleClose={handleClose} />
    </Box>
  )
}

export default ManufacturersForm