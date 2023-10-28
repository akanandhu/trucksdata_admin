import { Grid, IconButton } from '@mui/material'
import React from 'react'
import TextFormField from './input-fields/TextFormField'
import { GridAddIcon, GridCloseIcon } from '@mui/x-data-grid'

interface Props {
  fields: any
  control: any
  id: string
  size?: 'small' | 'medium'
  remove: any
  append: any
  marginBottom?: number
  label?: string
  keyValue?: string
}

const ArrayTextField = (props: Props) => {
  const { fields, control, id, size, remove, append, marginBottom, label, keyValue } = props

  return (
    <>
      {fields.map((option: any, index: any) => {
        return(
        <Grid display={'flex'} mb={marginBottom ?? 5}  key={option.id}>
          <TextFormField label={label ?? ''} control={control} id={`${[id]}[${index}].${[keyValue]}`} size={size ?? 'small'} />
          <IconButton onClick={() => remove(index)} color='secondary'>
            <GridCloseIcon color='error' />
          </IconButton>
          <IconButton onClick={() => append({ [keyValue ?? 'value']: '' })}>
            <GridAddIcon color='success' />
          </IconButton>
        </Grid>
      )})}
    </>
  )
}

export default ArrayTextField
