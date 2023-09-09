import { Box, Button, FormControl, Grid, MenuItem } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import SelectFormField from 'src/components/input-fields/SelectFormField'
import TextFormField from 'src/components/input-fields/TextFormField'
import { rows } from 'src/fake-data/rows'
import { Status } from 'src/fake-data/status'

const renderMenuItems = (obj: any) => {
  return (
    <MenuItem key={obj.id} value={obj.id}>
      {obj.title}
    </MenuItem>
  )
}



const SearchHeader = () => {
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
            <FormControl fullWidth size='small'>
              <TextFormField id='name' label='Model Name' placeholder='Model Name' control={control} />
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth size='small'>
              <SelectFormField
                placeholder='Vehicle Class'
                data={rows}
                renderMenuItems={renderMenuItems}
                control={control}
                id='vehicle_class'
              />
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormControl fullWidth size='small'>
              <SelectFormField
                placeholder='Status'
                data={Status}
                renderMenuItems={renderMenuItems}
                control={control}
                id='status'
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

export default SearchHeader
