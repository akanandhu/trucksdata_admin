import React from 'react'
import { Grid, IconButton, Tooltip } from '@mui/material'
import SelectFormField from './input-fields/SelectFormField'
import { renderOptions } from './renderOptions'
import { GridAddIcon, GridCloseIcon } from '@mui/x-data-grid'

interface Props {
  control: any
  options: any[]
  label: string
  selectedName: string
  displayKey: string
  valueKey: string
  specialValueKey: string
  isSpec: boolean
  handleRemove?: (field: any, index: number) => void
  arrayFields?: any
}

const ArrayFieldDropDown = (props: Props) => {
  const { control, options, handleRemove, arrayFields } = props

  const { fields, append } = arrayFields || {}

  function handleDelete(index: number, field: any) {
    handleRemove && handleRemove(field, index)
  }

  if (fields.length === 0) {
    append({ value: '' })
  }

  return (
    <div>
      {fields?.map((field: any, index: any) => {
        return (
          <Grid display={'flex'} marginY={4} key={index}>
            <SelectFormField
              control={control}
              id={`values.[${index}].value`}
              renderMenuItems={renderOptions}
              data={options}
              label={`Option ${index + 1}`}
              size={'medium'}
            />
            <IconButton onClick={() => handleDelete(index, field)} color='secondary'>
              <GridCloseIcon color='error' />
            </IconButton>
          </Grid>
        )
      })}
      <Tooltip title={'Add Option'}>
        <IconButton onClick={() => append({ value: '' })} color='secondary'>
          <GridAddIcon color='success' />
        </IconButton>
      </Tooltip>
    </div>
  )
}

export default ArrayFieldDropDown
