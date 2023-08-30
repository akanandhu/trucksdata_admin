import { Box,  Grid,  } from '@mui/material'
import React from 'react'
import {  useForm } from 'react-hook-form'
import ErrorBox from 'src/components/ErrorBox'
import ControlledTextField from 'src/components/input-fields/ControlledTextField'

const VehicleClassForm = () => {

    const {control, formState:{errors} } = useForm()
    
  return (
    <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form>
            <Grid container spacing={5} >
                <Grid item xs={12} >
                <ControlledTextField id='title' label='Vehicle Class Title'  size='medium'   control={control} />
                {errors.title && <ErrorBox error={errors.title} />}
                </Grid>
            </Grid>

        </form>
    </Box>
  )
}

export default VehicleClassForm