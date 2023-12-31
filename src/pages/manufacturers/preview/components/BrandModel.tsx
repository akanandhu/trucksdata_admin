import { Box, FormControl, Grid } from '@mui/material'
import React from 'react'
import DrawerActions from 'src/components/drawers/DrawerActions'
import TextFormField from 'src/components/input-fields/TextFormField'
import SelectFormField from 'src/components/input-fields/SelectFormField'
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import { renderMenu } from 'src/components/renderMenuItemsName'
import ErrorBox from 'src/components/ErrorBox'

const BrandModel = ({
  handleClose,
  vehicle_classes,
  control,
  handleSubmit,
  onSubmit,
  errors
}: {
  control: any
  handleClose: () => void
  vehicle_classes: any
  handleSubmit: any
  onSubmit: (values: any) => void
  errors: any
}) => {
  return (
    <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
      <DropzoneWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextFormField control={control} id='title' label='Vehicle Series' required size='medium' />
              {errors?.title && <ErrorBox error={errors?.title} />}
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth size='small'>
                <SelectFormField
                  label='Vehicle Class'
                  data={vehicle_classes?.data?.data ?? []}
                  renderMenuItems={renderMenu}
                  control={control}
                  size='medium'
                  id='vehicle_type_id'
                  required
                />
              </FormControl>
              {errors?.vehicle_type_id && <ErrorBox error={errors?.vehicle_type_id} />}
            </Grid>
            <Grid item xs={12}>
              <TextFormField control={control} id='description' label='Description' multiline rows={9} size='medium' />
              {errors?.description && <ErrorBox error={errors?.description} />}
            </Grid>
          </Grid>
          <DrawerActions handleClose={handleClose} />
        </form>
      </DropzoneWrapper>
    </Box>
  )
}

export default BrandModel
