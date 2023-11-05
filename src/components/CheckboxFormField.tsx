import { Checkbox, FormLabel, Grid } from '@mui/material'
import React from 'react'
import { Control, Controller, FieldError } from 'react-hook-form'
import ErrorBox from './ErrorBox'

interface CheckBoxFormFieldProps {
  id: string
  control: Control
  error?: FieldError
  labelBeforeCheck?: string
  labelAfterCheck?: string
  handleCheckboxChange?: (e: { target: { checked: boolean } }) => void
}

const CheckBoxFormField = (props: CheckBoxFormFieldProps) => {
  const { id, control, error, labelBeforeCheck, labelAfterCheck, handleCheckboxChange } = props

  return (
    <Grid>
      {labelBeforeCheck && <FormLabel>{labelBeforeCheck}</FormLabel>}
      <Controller
        name={`${id}`}
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange, onBlur } }) => (
          <Checkbox
            value={value}
            checked={value}
            onChange={e => {
              onChange(e)
              handleCheckboxChange && handleCheckboxChange(e)
            }}
            onBlur={onBlur}
            color='primary'
          />
        )}
      />
      {labelAfterCheck && <FormLabel>{labelAfterCheck}</FormLabel>}
      {error && <ErrorBox error={error} />}
    </Grid>
  )
}

export default CheckBoxFormField
