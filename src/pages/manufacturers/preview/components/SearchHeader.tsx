import { Box,  FormControl, Grid, MenuItem } from '@mui/material'
import React from 'react'
import SelectFormField from 'src/components/input-fields/SelectFormField'

const renderMenuItems = (obj: any) => {
  return (
    <MenuItem key={obj.id} value={obj.id}>
      {obj.name}
    </MenuItem>
  )
}

const SearchHeader = ({ handleSubmit, onSubmit, control, vehicle_classes, setVehicleId }: any) => {
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
              <SelectFormField
                label='Vehicle Class'
                data={vehicle_classes?.data?.data ?? []}
                size={'small'}
                renderMenuItems={renderMenuItems}
                control={control}
                id='vehicle_class'
                handleOnChange={e => setVehicleId(e.target.value)}
              />
            </FormControl>
          </Grid>
        </Box>
      </form>
    </>
  )
}

export default SearchHeader
