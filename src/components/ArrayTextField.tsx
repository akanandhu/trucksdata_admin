import { Button, Grid, IconButton } from '@mui/material'
import React from 'react'
import TextFormField from './input-fields/TextFormField'
import { GridCloseIcon } from '@mui/x-data-grid'

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
  handleDeleteItem: (id: string) => void
}

const ArrayTextField = (props: Props) => {
  const { fields, control, id, size, remove, append, marginBottom, label, keyValue, handleDeleteItem } = props

  function handleDelete(index:any, option: any){
    remove(index)
    handleDeleteItem && handleDeleteItem(option)
  }

  return (
    <>
      {fields.map((option: any, index: any) => {

        return (
          <Grid display={'flex'} mb={marginBottom ?? 5} key={option.id}>
            <TextFormField
              label={label ?? ''}
              control={control}
              id={`${[id]}[${index}].${[keyValue]}`}
              size={size ?? 'small'}
            />
            <IconButton onClick={() => handleDelete(index, option)} color='secondary'>
              <GridCloseIcon color='error' />
            </IconButton>
          </Grid>
        )
      })}
      <Button variant='outlined' onClick={() => append({ [keyValue ?? 'value']: '' })}>
        Add Option
      </Button>
    </>
  )
}

export default ArrayTextField
