import {  FormLabel, Grid } from '@mui/material'
import React, { Fragment, useState } from 'react'
import SelectFormField from 'src/components/input-fields/SelectFormField'
import TextFormField from 'src/components/input-fields/TextFormField'
import { StatusRow } from 'src/fake-data/status'
import { renderMenuItems } from 'src/components/renderStatusMenuItems'
import FileInput from 'src/components/input-fields/FileInput'
import { useGetVehicleClasses } from 'src/api/services/vehicle-class/get'
import { renderMenu } from 'src/components/renderMenuItemsName'
import { useGetManufacturers } from 'src/api/services/manufacturers/get'
import { useGetManufacturerSeries } from 'src/api/services/manufacturers/series/get'
import { useGetEnergySources } from 'src/api/services/energy/get'

const VehicleBasicForm = ({ control }: { control: any }) => {
  const [vehicleClassId, setVehicleClassId] = useState('')
  const [manufacturerId, setManufacturerId] = useState(0)

  // vehicle class data
  const { data: vehicle_class } = useGetVehicleClasses()
  const vehicleClass = vehicle_class?.data?.data

  // manufacturer data
  const { data: manufacturers } = useGetManufacturers()
  const manufacturersData = manufacturers?.data?.data

  // series data
  const { data: series } = useGetManufacturerSeries(manufacturerId ?? 0, { vehicle_type_id: vehicleClassId })
  const seriesData = series?.data?.data

  // energy data
  const { data: energy } = useGetEnergySources()
  const energyData = energy?.data?.data
  console.log(energy, 'energyCheck')

  return (
    <Fragment>
      <Grid item xs={12} sm={6}>
        <TextFormField control={control} id='name' label='Variant Name' required size='medium' />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SelectFormField
          label='Vehicle Class'
          data={vehicleClass ?? []}
          required
          size={'medium'}
          renderMenuItems={renderMenu}
          handleOnChange={e => setVehicleClassId(e.target.value)}
          control={control}
          id='vehicle_class'
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SelectFormField
          label='Brand Name'
          data={manufacturersData}
          size={'medium'}
          required
          renderMenuItems={renderMenu}
          handleOnChange={e => setManufacturerId(e.target.value as any)}
          control={control}
          id='brand_name'
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SelectFormField
          label='Model Name'
          data={seriesData ?? []}
          size={'medium'}
          renderMenuItems={renderMenu}
          control={control}
          id='model_name'
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFormField control={control} id='min_price' size='medium' type='number' label='Min Price' />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFormField control={control} id='max_price' size='medium' type='number' label='Max Price' />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SelectFormField
          label='Status'
          data={StatusRow}
          size={'medium'}
          required
          renderMenuItems={renderMenuItems}
          control={control}
          id='brand_name'
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <SelectFormField
          label='Fuel Type'
          data={energyData}
          size={'medium'}
          renderMenuItems={renderMenu}
          control={control}
          id='fuel_type'
        />
      </Grid>
      <Grid display={'flex'} flexDirection={'column'} gap={1} item xs={12}>
        <FormLabel>Images</FormLabel>
        <FileInput control={control} id='images' multiple />
      </Grid>
      <Grid display={'flex'} flexDirection={'column'} gap={1} item xs={12}>
        <FormLabel>Brochure</FormLabel>
        <FileInput control={control} id='brochure' multiple />
      </Grid>
      <Grid mt={2} item xs={12}>
        <TextFormField control={control} id='description' label='Description' multiline rows={10} size='medium' />
      </Grid>
    </Fragment>
  )
}

export default VehicleBasicForm
