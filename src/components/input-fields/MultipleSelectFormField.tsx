import { Divider, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material'
import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { ManufacturersFields } from 'src/types/Manufacturers'

interface MultipleSelectProps {
  label: any
  id: string
  control: Control<ManufacturersFields>
  data: any
  ref?: any
  required?: boolean
  valueKey?: string
  selectedName?: string
  displayKey?: string
  specialValueKey?: string
  isSpec?: boolean
  isName?: boolean
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

const MultipleSelectFormField = ({
  label,
  id,
  control,
  data,
  required,
  ref,
  valueKey = 'name',
  selectedName = 'name',
  displayKey = 'name',
  specialValueKey = 'id',
  isSpec,
  isName
}: MultipleSelectProps) => {
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
            value={value ?? []}
            required={required ?? false}
            onChange={onChange}
            onBlur={onBlur}
            input={<OutlinedInput label='Vehicle Types' />}
            placeholder='Vehicle Types'
            MenuProps={MenuProps}
            renderValue={selected =>
              selected
                ?.map((id: any) => {
                  const selectedOption = isSpec
                    ? data?.find((item: { option: string }) => item?.option === id)
                    : isName
                    ? data?.find((item: { name: string }) => item.name === id)
                    : data.find(
                        (item: any) =>
                          item[specialValueKey ? specialValueKey : valueKey] === id || item?.name === id?.name
                      )

                  console.log(data, id, 'specccName')

                  return selectedOption ? selectedOption[selectedName] : ''
                })
                .join(', ')
            }
          >
            {data?.map((obj: any) => {
              return (
                <MenuItem key={obj?.id} value={obj[valueKey as any]}>
                  {obj?.[displayKey ?? 'name']}
                  <Divider ref={ref} />
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
