import { Box, Grid } from '@mui/material'
import React from 'react'
import { Control, FieldErrors, UseFormHandleSubmit } from 'react-hook-form'
import ErrorBox from 'src/components/ErrorBox'
import SelectFormField from 'src/components/input-fields/SelectFormField'
import TextFormField from 'src/components/input-fields/TextFormField'
import { renderMenuItems } from '../../../components/renderStatusMenuItems'
import { VehicleClassFields } from 'src/types/VehicleClass'
import DrawerActions from 'src/components/drawers/DrawerActions'
import MultipleSelectFormField from 'src/components/input-fields/MultipleSelectFormField'

const statusData = [
  {
    id: 'active',
    status: 'Active'
  },
  {
    id: 'disabled',
    status: 'Disabled'
  }
]

const VehicleClassForm = ({
  control,
  errors,
  handleClose,
  handleSubmit,
  onSubmit,
  apiError,
  energy
}: {
  control: Control<VehicleClassFields>
  errors: FieldErrors
  handleClose: () => void
  handleSubmit: UseFormHandleSubmit<VehicleClassFields>
  onSubmit: (values: VehicleClassFields) => void
  apiError: any
  energy: any
}) => {
 

  return (
    <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <TextFormField id='name' label='Vehicle Class Title' size='medium' required control={control} />
            {errors.title && <ErrorBox error={errors.title} />}
          </Grid>
          <Grid item xs={12}>
            <MultipleSelectFormField
              data={energy ?? []}
              id='energy_sources'
              label='Energy Sources'
              control={control as any}
            />
            {errors.energy_sources && <ErrorBox error={errors.energy_sources} />}
          </Grid>
          <Grid item xs={12}>
            <SelectFormField
              data={statusData}
              id='status'
              label='Status'
              size='medium'
              required
              control={control}
              renderMenuItems={renderMenuItems}
            />
            {errors.title && <ErrorBox error={errors.title} />}
          </Grid>
        </Grid>
        {apiError && <ErrorBox error={apiError} />}
        <DrawerActions handleClose={handleClose} />
      </form>
    </Box>
  )
}

export default VehicleClassForm
