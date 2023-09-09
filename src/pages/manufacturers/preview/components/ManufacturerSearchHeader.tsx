import { Box, Button, FormControl, Grid, MenuItem } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import SelectFormField from 'src/components/input-fields/SelectFormField'
import TextFormField from 'src/components/input-fields/TextFormField'
import { rows } from 'src/fake-data/rows'

const renderMenuItems = (obj: any) => {
  return (
    <MenuItem key={obj.id} value={obj.id}>
      {obj.title}
    </MenuItem>
  )
}



const ManufacturerSearchHeader = () => {
  const { control, handleSubmit } = useForm()

  const onSubmit = (values: any) => {
    console.log(values)
  }

  return (
    <>
      <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            py: 4,
            px: 6,
            rowGap: 2,
            columnGap: 4,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}
        >
          <Grid item xs={3}>
            <FormControl fullWidth >
              <TextFormField id='name' label='Brand Title' placeholder='Brand Title' control={control} />
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth >
              <SelectFormField
                label='Vehicle Class'
                data={rows}
                size={'small'}
                renderMenuItems={renderMenuItems}
                control={control}
                id='vehicle_class'
              />
            </FormControl>
          </Grid>


          <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
            <Button type='submit' variant='contained' sx={{ '& svg': { mr: 2 }, px: 9 }}>
              search
            </Button>

            <Button type='button' color='error' variant='contained' sx={{ '& svg': { mr: 2 } }}>
              clear
            </Button>
          </Box>
        </Box>
      </form>
    </>
  )
}

export default ManufacturerSearchHeader
