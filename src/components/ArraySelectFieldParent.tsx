import React from 'react'
import { useFieldArray } from 'react-hook-form'
import { Grid, IconButton, Tooltip } from '@mui/material'
import SelectFormField from './input-fields/SelectFormField'
import { GridAddIcon, GridCloseIcon } from '@mui/x-data-grid'
import { flattenOptions } from 'src/functions/flattenOptions'
import { renderParentMenuItems } from './renderParentMenuItems'

interface Props {
  control: any
  options: any[]
  label: string
  handleRemove?: (field: any) => void
}

const ArraySelectFieldParent = (props: Props) => {
  const { control, options, handleRemove, label } = props
  const { fields, append, remove } = useFieldArray({
    name: 'values',
    control
  })

  function handleDelete(index: number, field: any) {
    remove(index)
    handleRemove && handleRemove(field)
  }

  if (fields.length === 0) {
    append({ value: '' })
  }

  return (
    <div>
      {fields?.map((field, index) => {
        return (
          <Grid display={'flex'} marginY={4} key={index}>
            <SelectFormField
              label={label}
              data={flattenOptions(options) ?? []}
              size={'medium'}
              renderMenuItems={renderParentMenuItems}
              control={control}
              id={`values.[${index}].value`}
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

export default ArraySelectFieldParent
