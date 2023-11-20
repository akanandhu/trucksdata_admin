import { Button, Grid, IconButton } from '@mui/material'
import { GridCloseIcon } from '@mui/x-data-grid'
import React from 'react'
import { useFieldArray } from 'react-hook-form'
import TextFormField from './TextFormField'

const FaqField = ({ control, isManufacturer }: { control: any; isManufacturer?: boolean }) => {
  const { fields, append, remove } = useFieldArray({
    name: 'faq',
    control
  })

  return (
    <Grid mt={2} item xs={12}>
      {fields?.map((field, index) => {
        return (
          <Grid container display={'flex'} gap={6} mt={6} item xs={12} key={index}>
            <Grid item md={isManufacturer ? 10 : 11} xs={12}>
              <TextFormField
                label={`FAQ Question ${index + 1}`}
                control={control}
                id={`faq.[${index}].question`}
                size='medium'
              />
            </Grid>
            <Grid>
              <IconButton onClick={() => remove(index)} color='secondary'>
                <GridCloseIcon color='error' />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <TextFormField
                label={`FAQ Answer ${index + 1}`}
                control={control}
                id={`faq.[${index}].answer`}
                size='medium'
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
        )
      })}
      <Button sx={{ marginTop: 4 }} variant='outlined' onClick={() => append({ url: '', language: '' })}>
        Add FaQs
      </Button>
    </Grid>
  )
}

export default FaqField
