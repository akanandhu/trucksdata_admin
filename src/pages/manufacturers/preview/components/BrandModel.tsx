import { Box, FormControl, Grid } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import DrawerActions from 'src/components/drawers/DrawerActions'
import MultipleSelectFormField from 'src/components/input-fields/MultipleSelectFormField'
import TextFormField from 'src/components/input-fields/TextFormField'
import { rows } from 'src/fake-data/rows'
import { renderVehicleClassItems } from '../../components/VehicleMenuItems'
import SelectFormField from 'src/components/input-fields/SelectFormField'
import {  StatusRow } from 'src/fake-data/status'
import { renderMenuItems } from 'src/pages/vehicle-class/components/StatusMenuItems'
import FileUploaderMultiple from 'src/components/input-fields/FileUploaderWithPreview'
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'

const BrandModel = ({handleClose}: {handleClose: () => void}) => {

    const {control} = useForm()
    const [file,setFile] = useState([])

  return (
    <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
            <DropzoneWrapper>

      <form>
        <Grid container spacing={5}>
          <Grid  item xs={12}>
                <FileUploaderMultiple files={file} setFiles={setFile}  />
            </Grid>  
            <Grid item xs={12}>
               <TextFormField control={control} id='name' label='Vehicle Model' required size='medium' />
            </Grid>  
            <Grid item xs={12}>
            <MultipleSelectFormField id='vehicle_classes' control={control as any} data={rows}  label='Vehicle Class' renderMenuItems={renderVehicleClassItems}  />
            </Grid> 
            <Grid item xs={12}>
            <FormControl fullWidth size='small'>
              <SelectFormField
                label='Status'
                data={StatusRow}
                renderMenuItems={renderMenuItems}
                control={control}
                size='medium'
                id='status'
              />
            </FormControl>
            </Grid>

        </Grid>
      </form>
      </DropzoneWrapper>

      <DrawerActions handleClose={handleClose} />
    </Box>
  )
}

export default BrandModel