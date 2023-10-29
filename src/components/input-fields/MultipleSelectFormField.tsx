import { FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material'
import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { ManufacturersFields } from 'src/types/Manufacturers'

interface MultipleSelectProps {
  label: any
  id: string
  control: Control<ManufacturersFields>
  data: any
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
}

const MultipleSelectFormField = ({ label, id, control, data }: MultipleSelectProps) => {
  return (
    <FormControl fullWidth>
      <InputLabel id='-multiple-checkbox-label'>{label ?? ''}</InputLabel>
      <Controller
        name={id as any}
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <Select
            labelId='demo-multiple-checkbox-label'
            id='demo-multiple-checkbox'
            multiple
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            input={<OutlinedInput label='Vehicle Types' />}
            placeholder='Vehicle Types'
            renderValue={selected => selected?.map((item: string) => item).join(', ')}
            MenuProps={MenuProps}
          >
            {data.map((obj: { id: string; name: string }) => {
              return (
                <MenuItem key={obj?.id} value={obj?.name}>
                  <ListItemText primary={obj?.name} />
                </MenuItem>
              )
            })}
          </Select>
        )}
      />
    </FormControl>
  )
}

export default MultipleSelectFormField