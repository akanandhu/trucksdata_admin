import { Button, FormLabel, Grid, IconButton } from '@mui/material'
import React, { Fragment } from 'react'
import SelectFormField from 'src/components/input-fields/SelectFormField'
import TextFormField from 'src/components/input-fields/TextFormField'
import { StatusRow } from 'src/fake-data/status'
import { renderMenuItems } from 'src/components/renderStatusMenuItems'
import FileInput from 'src/components/input-fields/FileInput'
import { renderMenu } from 'src/components/renderMenuItemsName'
import { renderMenuItemsTitle } from 'src/components/renderMenuItemsTitle'
import { Control, useFieldArray } from 'react-hook-form'
import { VehicleSubmitTypes } from 'src/types/VehicleSubmitTypes'
import ErrorBox from 'src/components/ErrorBox'
import CheckBoxFormField from 'src/components/CheckboxFormField'
import { GridCloseIcon } from '@mui/x-data-grid'
import FaqField from 'src/components/input-fields/FaqField'

const languageData = [
  {
    id: 'english',
    name: 'English'
  },
  {
    id: 'malayalam',
    name: 'Malayalam'
  }
]

const VehicleBasicForm = ({
  errors,
  control,
  vehicleClass,
  manufacturersData,
  series,
  energyData
}: {
  errors: any
  step: number
  control: Control<VehicleSubmitTypes>
  specs: any
  vehicleClass: any
  manufacturersData: any
  series: any
  energyData: any
}) => {
  const { fields, append, remove } = useFieldArray({
    name: 'video_links',
    control
  })

  // if (fields.length === 0) {
  //   append({})
  // }

  function handleDeleteItem(index: any) {
    remove(index)
  }

  return (
    <Fragment>
      <Grid item xs={12} sm={6}>
        <SelectFormField
          label='Vehicle Class'
          data={vehicleClass ?? []}
          required
          size={'medium'}
          renderMenuItems={renderMenu}
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
          control={control}
          id='manufacturer_id'
        />
        {errors?.manufacturer_id && <ErrorBox error={errors?.manufacturer_id} />}
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFormField control={control} id='title' label='Variant Name' required size='medium' />
        {errors?.title && <ErrorBox error={errors?.title} />}
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
      <Grid mt={2} item xs={4}>
        <CheckBoxFormField control={control as any} id='is_popular' labelAfterCheck='Is this a Popular Truck?' />
      </Grid>
      <Grid mt={2} item xs={4}>
        <CheckBoxFormField control={control as any} id='is_latest' labelAfterCheck='Is this a Latest Truck?' />
      </Grid>
      <Grid mt={2} item xs={4}>
        <CheckBoxFormField control={control as any} id='is_upcoming' labelAfterCheck='Is this a Upcoming Truck?' />
      </Grid>
      <Grid mt={2} item xs={12}>
        {fields?.map((field, index) => {
          return (
            <Grid display={'flex'} gap={6} mt={6} item xs={12} key={index}>
              <TextFormField
                label='Youtube Video URL'
                control={control}
                id={`video_links.[${index}].url`}
                size='medium'
              />
              <SelectFormField
                control={control}
                id={`video_links.[${index}].language`}
                size={'medium'}
                renderMenuItems={renderMenu}
                placeholder='Video Language'
                label={'Video language'}
                data={languageData}
              />
              <IconButton onClick={() => handleDeleteItem(index)} color='secondary'>
                <GridCloseIcon color='error' />
              </IconButton>
            </Grid>
          )
        })}
        <Button sx={{ marginTop: 4 }} variant='outlined' onClick={() => append({ url: '', language: '' })}>
          Add Youtube Link
        </Button>
      </Grid>

      <Grid mt={2} item xs={12}>
        <TextFormField control={control} id='description' label='Description' multiline rows={10} size='medium' />
      </Grid>

      <Grid mt={2} item xs={12}  >
          <FaqField control={control}  />
      </Grid>
    </Fragment>
  )
}

export default VehicleBasicForm
