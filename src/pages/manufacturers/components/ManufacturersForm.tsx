import { Box, Grid } from '@mui/material'
import React, { useState } from 'react'
import ErrorBox from 'src/components/ErrorBox'
import DrawerActions from 'src/components/drawers/DrawerActions'
import TextFormField from 'src/components/input-fields/TextFormField'
import { renderVehicleClassItems } from '../../../components/renderVehicleMenuItems'
import MultipleSelectFormField from 'src/components/input-fields/MultipleSelectFormField'
import { Control, UseFormHandleSubmit } from 'react-hook-form'
import { ManufacturersFields } from 'src/types/Manufacturers'
import FileUploaderMultiple from 'src/components/input-fields/FileUploaderWithPreview'
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import { useGetVehicleClasses } from 'src/api/services/vehicle-class/get'
import { useAddFiles } from 'src/api/services/attachments/post'
import RequiredLabel from 'src/components/RequiredLable'

const ManufacturersForm = ({
  handleClose,
  errors,
  control,
  handleSubmit,
  onSubmit,
  fileLink,
  setFileLink,
  apiError
}: {
  handleClose: () => void
  control: Control<ManufacturersFields>
  handleSubmit: UseFormHandleSubmit<ManufacturersFields>
  onSubmit: (values: ManufacturersFields) => void
  errors: any
  fileLink:any
  setFileLink: any
  apiError:any
}) => {

  const {data: vehicle_types} = useGetVehicleClasses()
  const [file, setFile] = useState([])
  const [display, setDisplay] = useState(1)
  const addFiles = useAddFiles()

  function handleCloseFn () {
    setFile([])
    setDisplay(display + 1)
    handleClose()
  }

  return (
    <Box key={display} sx={{ p: theme => theme.spacing(0, 6, 6) }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <DropzoneWrapper>
              <FileUploaderMultiple files={file} setFiles={setFile} addFiles={addFiles} fileLink={fileLink} setFileLink={setFileLink} />
            </DropzoneWrapper>
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
              renderMenuItems={renderVehicleClassItems}
            />
            {errors?.vehicle_types && <ErrorBox error={errors?.vehicle_types} />}
          </Grid>
          <Grid item xs={12}>
            <TextFormField id='description' label='Description' size='medium'  rows={3} required multiline control={control} />
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
