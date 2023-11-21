import React from 'react'
import { Grid, IconButton, Tooltip } from '@mui/material'
import { GridAddIcon, GridCloseIcon } from '@mui/x-data-grid'
import TextFormField from './input-fields/TextFormField'

interface Props {
  control: any
  handleRemove?: (field: any, index: number) => void
  arrayFields?: any
}

const ArrayTextInput = (props: Props) => {
  const { control, handleRemove, arrayFields } = props
  const { fields, append } = arrayFields || {}

  function handleDelete(index: number, field: any) {
    handleRemove && handleRemove(field, index)
  }

  if (fields.length === 0) {
    append({ value: '' })
  }

  return (
    <div>
      {fields?.map((field: any, index: number) => {
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
