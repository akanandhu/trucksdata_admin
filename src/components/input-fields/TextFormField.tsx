import { TextField } from '@mui/material'
import React from 'react'
import { Control, Controller } from 'react-hook-form'
import RequiredLabel from '../RequiredLable'

const TextFormField = ({
  id,
  control,
  required,
  multiline,
  rows,
  type,
  handleTextChange,
  i,
  label,
  placeholder,
  size,
  isDisabled,
  InputProps
}: {
  id: string
  control: Control<any>
  required?: boolean
  multiline?: boolean
  rows?: number
  type?: string
  handleTextChange?: (e: any, i?: number) => void
  i?: number
  label?: string
  placeholder?: string
  size?: 'small' | 'medium'
  isDisabled?: boolean
  InputProps?: any
}) => {
  return (
    <Controller
      name={id}
      control={control}
      render={({ field: { value, onChange, onBlur } }) => (
        <TextField
          fullWidth
          type={type ?? 'text'}
          rows={rows ?? 0}
          disabled={isDisabled}
          multiline={multiline ?? false}
          inputProps={{
            maxLength: 1500
          }}
          InputProps={InputProps}
          value={value}
          onChange={e => {
            onChange(e)
            handleTextChange && handleTextChange(e, i)
          }}
          onWheel={(e:any) => e.target.blur()}
          sx={{
            '& .MuiFormLabel-asterisk': { color: 'red' },
            '& .MuiInputBase-input.Mui-disabled': {
              WebkitTextFillColor: '#000000'
            }
          }}
          onBlur={onBlur}
          size={size ?? 'small'}
          label={label && required ? <RequiredLabel text={label} /> : label ? label : null}
          placeholder={placeholder ?? ''}
        ></TextField>
      )}
    />
  )
}

export default TextFormField
