import { Box, Grid } from '@mui/material'
import React from 'react'
import { Control, FieldErrors, UseFormHandleSubmit } from 'react-hook-form'
import ErrorBox from 'src/components/ErrorBox'
import SelectFormField from 'src/components/input-fields/SelectFormField'
import TextFormField from 'src/components/input-fields/TextFormField'
import { renderMenuItems } from '../../../components/renderStatusMenuItems'
import DrawerActions from 'src/components/drawers/DrawerActions'
import { FieldDataTypes, SpecFields } from 'src/types/SpecFields'
import { useGetSpecCategories } from 'src/api/services/specifications/category/get'
import ArrayTextField from 'src/components/ArrayTextField'
import { renderSpecMenuItems } from 'src/components/renderSpecCategoryMenu'
import NestedArrayField from 'src/components/NestedArrayField'
import CheckBoxFormField from 'src/components/CheckboxFormField'

const dataTypes = [
  {
    id: 'text',
    status: 'Text'
  },
  {
    id: 'drop_down',
    status: 'Drop down'
  },
  {
    id: 'nested_drop_down',
    status: 'Nested Drop down'
  }
]

const SpecForm = ({
  control,
  errors,
  handleClose,
  handleSubmit,
  onSubmit,
  apiError,
  options,
  data_type,
  mutationLoading,
  handleDeleteOption
}: {
  control: Control<SpecFields>
  errors: FieldErrors
  handleClose: () => void
  handleSubmit: UseFormHandleSubmit<SpecFields>
  onSubmit: (values: SpecFields) => void
  apiError: any
  options: any
  data_type: FieldDataTypes
  mutationLoading: boolean
  handleDeleteOption: (id: string) => void
}) => {
  const specCategories = useGetSpecCategories()
  const { fields, append, remove } = options

  if (fields.length === 0) {
    append({ option: '' })
  }

  function handleDataType(value: string) {
    if (value !== 'text') {
      for (let i = fields.length - 1; i > 0; i--) {
        remove(i)
      }
    }
  }

  return (
    <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <TextFormField id='name' label='Specification Name' size='medium' required control={control} />
            {errors.name && <ErrorBox error={errors.name} />}
          </Grid>
          <Grid item xs={12}>
            <SelectFormField
              data={specCategories?.data?.data?.data ?? []}
              id='specification_category_id'
              label='Specification Category'
              size='medium'
              required
              control={control}
              renderMenuItems={renderSpecMenuItems}
            />
            {errors.specification_category_id && <ErrorBox error={errors.specification_category_id} />}
          </Grid>
          <Grid item xs={12}>
            <SelectFormField
              data={dataTypes}
              id='data_type'
              label='Data Type'
              size='medium'
              required
              control={control}
              renderMenuItems={renderMenuItems}
              handleOnChange={e => handleDataType(e.target.value)}
            />
            {errors.data_type && <ErrorBox error={errors.data_type} />}
          </Grid>
          {data_type === 'drop_down' && (
            <Grid item xs={12}>
              <ArrayTextField
                append={append}
                control={control}
                fields={fields}
                id='options'
                remove={remove}
                size='medium'
                label='Option'
                keyValue='option'
                handleDeleteItem={handleDeleteOption}
              />
            </Grid>
          )}
          {data_type === 'nested_drop_down' && (
            <Grid item xs={12}>
              <NestedArrayField append={append} control={control} fields={fields} remove={remove} handleDeleteItem={handleDeleteOption} />
            </Grid>
          )}
          <Grid item xs={12}>
            <CheckBoxFormField control={control as any} id='is_key_feature' labelAfterCheck='Show as Highlights?' />
          </Grid>
        </Grid>
        {apiError && <ErrorBox error={apiError} />}
        <DrawerActions addDisabled={mutationLoading} handleClose={handleClose} />
      </form>
    </Box>
  )
}

export default SpecForm
