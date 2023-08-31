import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { Box, Chip, FormControl, InputLabel, Select } from '@mui/material'
import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { ManufacturersFields } from 'src/types/Manufacturers'

interface MultipleSelectProps {
  label: string
  id: string
  control: Control<ManufacturersFields>
  data: any
  renderMenuItems : (obj:any) => ReactJSXElement
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

const MultipleSelectFormField = ({ label, id, control, data, renderMenuItems }: MultipleSelectProps) => {
  return (
    <FormControl fullWidth>
      <InputLabel id='-multiple-checkbox-label'>{label ?? ''}</InputLabel>
      <Controller
        name={id as any}
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <Select
            multiple
            label={label ?? ''}
            value={value}
            MenuProps={MenuProps}
            onChange={onChange}
            defaultValue={[]}
            onBlur={onBlur}
            id='multiple-checkbox'
            labelId='multiple-checkbox-label'
            renderValue={selected => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {(selected as unknown as string[]).map(value => (
                  <Chip key={value} label={value} sx={{ m: 0.75 }} />
                ))}
              </Box>
            )}
          >
            {data && data?.map((obj: any) => renderMenuItems(obj))}
          </Select>
        )}
      />
    </FormControl>
  )
}

export default MultipleSelectFormField
