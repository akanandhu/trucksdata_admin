import React from 'react'
import TextFormField from './input-fields/TextFormField'
import { useFieldArray } from 'react-hook-form'
import { Grid, IconButton, Tooltip } from '@mui/material'
import { GridAddIcon, GridCloseIcon } from '@mui/x-data-grid'

const NestedFieldsChild = ({ nestIndex, control }: { nestIndex: number; control: any }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `options.${nestIndex}.child_options`
  })

  return (
    <Grid mt={1}>
      {fields.map((item, index) => (
        <Grid display={'flex'} gap={3} marginTop={3} key={item.id}>
          <TextFormField control={control} id={`options[${nestIndex}].child_options[${index}].option`} />
          <IconButton onClick={() => remove(index)} color='secondary'>
            <GridCloseIcon color='error' />
          </IconButton>
        </Grid>
      ))}
      <Tooltip title='Add Child'>
        <IconButton
          onClick={() =>
            append({
              option: ''
            })
          }
          color='secondary'
          sx={{ marginY: 1 }}
        >
          <GridAddIcon color='success' />
        </IconButton>
      </Tooltip>
    </Grid>
  )
}

export default NestedFieldsChild
