import React from 'react'
import { useFieldArray } from 'react-hook-form'
import { Grid, IconButton, Tooltip } from '@mui/material'
import { GridAddIcon, GridCloseIcon } from '@mui/x-data-grid'
import TextFormField from './input-fields/TextFormField'

interface Props {
  control: any
  handleRemove?: (field: any) => void
}

const ArrayTextInput = (props: Props) => {
  const { control, handleRemove } = props
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
            <TextFormField
              control={control}
              id={`values.[${index}].value`}
              size='medium'
              label={`Option ${index + 1}`}
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

export default ArrayTextInput
