import { FormLabel, Grid } from '@mui/material'
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
import { renderMenuItemsTitle } from 'src/components/renderMenuItemsTitle'
import usePrefillDefault from '../hooks/usePrefillDefault'
import { Control, UseFormSetValue } from 'react-hook-form'
import { VehicleSubmitTypes } from 'src/types/VehicleSubmitTypes'
import ErrorBox from 'src/components/ErrorBox'

const VehicleBasicForm = ({
  errors,
  control,
  setValue
}: {
  errors: any
  step: number
  control: Control<VehicleSubmitTypes>
  specs: any
  setValue: UseFormSetValue<VehicleSubmitTypes>
}) => {
  const [vehicleClassId, setVehicleClassId] = useState('')
  const [manufacturerId, setManufacturerId] = useState(0)

  // vehicle class data
  const { data: vehicle_class } = useGetVehicleClasses()
  const vehicleClass = vehicle_class?.data?.data

  // manufacturer data
  const { data: manufacturers } = useGetManufacturers()
  const manufacturersData = manufacturers?.data?.data

  const { data: series } = useGetManufacturerSeries(manufacturerId ?? 0, { vehicle_type_id: vehicleClassId })

  // energy data
  const { data: energy } = useGetEnergySources()
  const energyData = energy?.data?.data

  usePrefillDefault({
    vehicleClass,
    setValue
  })

  return (
    <Fragment>
      <Grid item xs={12} sm={6}>
        <TextFormField control={control} id='title' label='Variant Name' required size='medium' />
        {errors?.title && <ErrorBox error={errors?.title} />}
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
          id='vehicle_type_id'
        />
        {errors?.vehicle_type_id && <ErrorBox error={errors?.vehicle_type_id} />}
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
          id='manufacturer_id'
        />
        {errors?.manufacturer_id && <ErrorBox error={errors?.manufacturer_id} />}
      </Grid>
      <Grid item xs={12} sm={6}>
        <SelectFormField
          label='Series Name'
          data={series ?? []}
          size={'medium'}
          renderMenuItems={renderMenuItemsTitle}
          control={control}
          id='series_id'
        />
        {errors?.series_id && <ErrorBox error={errors?.series_id} />}
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFormField control={control} id='min_price' size='medium' type='number' label='Min Price' />
        {errors?.min_price && <ErrorBox error={errors?.min_price} />}
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFormField control={control} id='max_price' size='medium' type='number' label='Max Price' />
        {errors?.max_price && <ErrorBox error={errors?.max_price} />}
      </Grid>
      <Grid item xs={12} sm={6}>
        <SelectFormField
          label='Status'
          data={StatusRow}
          size={'medium'}
          required
          renderMenuItems={renderMenuItems}
          control={control}
          id='status'
        />
        {errors?.status && <ErrorBox error={errors?.status} />}
      </Grid>
      <Grid item xs={12} sm={6}>
        <SelectFormField
          label='Fuel Type'
          data={energyData}
          size={'medium'}
          renderMenuItems={renderMenu}
          control={control}
          id='energy_source_id'
          required
        />
        {errors?.energy_source_id && <ErrorBox error={errors?.energy_source_id} />}
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
