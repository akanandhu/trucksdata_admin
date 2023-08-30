import { Box, Grid } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import ErrorBox from 'src/components/ErrorBox'
import SelectFormField from 'src/components/input-fields/SelectFormField'
import TextFormField from 'src/components/input-fields/TextFormField'
import { renderMenuItems } from './StatusMenuItems'

const statusData = [
  {
    id: 'active',
    status: 'Active'
  },
  {
    id: 'in-active',
    status: 'In-active'
  }
]

const VehicleClassForm = () => {
  const {
    control,
    formState: { errors }
  } = useForm()

  return (
    <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
      <form>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <TextFormField id='title' label='Vehicle Class Title' size='medium' required control={control} />
            {errors.title && <ErrorBox error={errors.title} />}
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
      </form>
    </Box>
  )
}

export default VehicleClassForm
