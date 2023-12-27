import React from 'react'
import TextFormField from './input-fields/TextFormField'
import { Button, Grid } from '@mui/material'
import NestedFieldsChild from './NestedFieldsChild'

interface NestedArrayProps {
  fields: any
  append: any
  remove: any
  control: any
  handleDeleteItem?: any
}

const NestedArrayField = (props: NestedArrayProps) => {
  const { fields, append, remove, control, handleDeleteItem } = props

  function handleDelete(index:any, option: any){
      remove(index)
    handleDeleteItem && handleDeleteItem(option)
  }

  return (
    <div>
      {fields?.map((item: { id: string  }, index: any) => (
        <Grid key={item.id}>
          <TextFormField label='Parent Option' size='medium' control={control} id={`options[${index}].option`} />

          <NestedFieldsChild nestIndex={index} control={control}  />
          <Grid marginTop={3} marginBottom={6} display={'flex'} gap={4}>
            <Button color='error' variant='outlined' onClick={() => handleDelete(index, item)}>
              Delete
            </Button>
          </Grid>
        </Grid>
      ))}
      <Button 
              variant='outlined'
              onClick={() =>
                append({
                  option: '',
                  child_options: [
                    {
                      option: ''
                    }
                  ]
                })
              }
            >
              Add Parent
            </Button>
    </div>
  )
}

export default NestedArrayField
