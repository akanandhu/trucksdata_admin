import { Box, Grid } from '@mui/material'
import React, { useState } from 'react'
import ErrorBox from 'src/components/ErrorBox'
import DrawerActions from 'src/components/drawers/DrawerActions'
import TextFormField from 'src/components/input-fields/TextFormField'
import MultipleSelectFormField from 'src/components/input-fields/MultipleSelectFormField'
import { Control, UseFormHandleSubmit } from 'react-hook-form'
import { ManufacturersFields } from 'src/types/Manufacturers'
import RequiredLabel from 'src/components/RequiredLable'
import FileInput from 'src/components/input-fields/FileInput'

const ManufacturersForm = ({
  handleClose,
  errors,
  control,
  handleSubmit,
  onSubmit,
  apiError,
  vehicle_types
}: {
  handleClose: () => void
  control: Control<ManufacturersFields>
  handleSubmit: UseFormHandleSubmit<ManufacturersFields>
  onSubmit: (values: ManufacturersFields) => void
  errors: any
  apiError: any
  vehicle_types: any
}) => {
  const [display, setDisplay] = useState(1)

  function handleCloseFn() {
    setDisplay(display + 1)
    handleClose()
  }

  console.log(vehicle_types?.data?.data, 'enerySaveee')

  return (
    <Box key={display} sx={{ p: theme => theme.spacing(0, 6, 6) }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <FileInput control={control} id='logo' multiple />
          </Grid>
          <Grid item xs={12}>
            <TextFormField id='name' label='Manufacturer Brand Name' size='medium' required control={control} />
            {errors?.name && <ErrorBox error={errors?.name} />}
          </Grid>
          <Grid item xs={12}>
            <MultipleSelectFormField
              id='vehicle_types'
              control={control}
              data={vehicle_types?.data?.data ?? []}
              label={<RequiredLabel text='Vehicle Types' />}
              isName

            />
            {errors?.vehicle_types && <ErrorBox error={errors?.vehicle_types} />}
          </Grid>
          <Grid item xs={12}>
            <TextFormField
              id='description'
              label='Description'
              size='medium'
              rows={3}
              required
              multiline
              control={control}
            />
            {errors?.description && <ErrorBox error={errors?.description} />}
          </Grid>
        </Grid>
        {apiError && <ErrorBox error={apiError} />}
        <DrawerActions handleClose={handleCloseFn} />
      </form>
    </Box>
  )
}

export default ManufacturersForm
