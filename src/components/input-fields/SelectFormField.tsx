import { FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material'
import React from 'react'
import { Control, Controller } from 'react-hook-form'
import RequiredLabel from '../RequiredLable'

const SelectFormField = ({
  id,
  control,
  required,
  handleOnChange,
  i,
  label,
  placeholder,
  size,
  isDisabled,
  renderMenuItems,
  data,
  isMultiple
}: {
  id: string
  control: Control<any>
  required?: boolean
  handleOnChange?: (e: SelectChangeEvent, i?: number) => void
  i?: number
  label?: string
  placeholder?: string
  size?: any
  isDisabled?: boolean
  renderMenuItems: (obj: any) => void
  data?: any
  isMultiple?: boolean
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id='input-label' size={size ?? 'normal'} >
        {label && required ? <RequiredLabel text={label} /> : label ? label : ''}
      </InputLabel>
      <Controller
        name={id}
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <Select
            fullWidth
            labelId='input-label'
            disabled={isDisabled}
            label={label ?? ''}
            value={value}
            multiple={isMultiple ? true : false}
            defaultValue={isMultiple ? [] : ''}
            onChange={e => {
              onChange(e)
              handleOnChange && handleOnChange(e, i)
            }}
            sx={{
              '& .MuiFormLabel-asterisk': { color: 'red' },
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: '#000000'
              }
            }}
            onBlur={onBlur}
            size={size ?? 'small'}
            placeholder={placeholder ?? ''}
          >
            {data && data?.map((obj: any) => renderMenuItems(obj))}
          </Select>
        )}
      />
    </FormControl>
  )
}

export default SelectFormField
