import { Box, Grid } from '@mui/material'
import React, { useState } from 'react'
import ErrorBox from 'src/components/ErrorBox'
import DrawerActions from 'src/components/drawers/DrawerActions'
import TextFormField from 'src/components/input-fields/TextFormField'
import { rows } from 'src/fake-data/rows'
import { renderVehicleClassItems } from '../../../components/renderVehicleMenuItems'
import MultipleSelectFormField from 'src/components/input-fields/MultipleSelectFormField'
import { Control } from 'react-hook-form'
import { ManufacturersFields } from 'src/types/Manufacturers'
import FileUploaderMultiple from 'src/components/input-fields/FileUploaderWithPreview'
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'

const ManufacturersForm = ({
  handleClose,
  errors,
  control
}: {
  handleClose: () => void
  control: Control<ManufacturersFields>
  errors: any
}) => {
  const [file, setFile] = useState([])

  return (
    <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
      <form>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <DropzoneWrapper>
              <FileUploaderMultiple files={file} setFiles={setFile} />
            </DropzoneWrapper>
          </Grid>
          <Grid item xs={12}>
            <TextFormField id='title' label='Manufacturer Brand Name' size='medium' required control={control} />
            {errors?.title && <ErrorBox error={errors?.title} />}
          </Grid>
          <Grid item xs={12}>
            <MultipleSelectFormField
              id='vehicle_classes'
              control={control}
              data={rows}
              label='Vehicle Class'
              renderMenuItems={renderVehicleClassItems}
            />
          </Grid>
        </Grid>
      </form>
      <DrawerActions handleClose={handleClose} />
    </Box>
  )
}

export default ManufacturersForm
