import { Grid } from '@mui/material'
import React from 'react'
import { FieldDataTypes, Fields, OptionTypes } from 'src/types/SpecFields'
import TextFormField from './input-fields/TextFormField'
import SelectFormField from './input-fields/SelectFormField'
import { renderOptions } from './renderOptions'

const TextFieldComponent = ({ name, control }: { name: string; control: any }) => {
  return (
    <Grid item xs={12} sm={6}>
      <TextFormField control={control} id={name} label={name} size='medium' />
    </Grid>
  )
}

const DropdownComponent = ({ name, control, options }: { name: string; control: any; options : OptionTypes[] }) => {
    console.log(options, 'opttt')

  return (
    <Grid item xs={12} sm={6}>
      <SelectFormField
        label={name}
        data={options ?? []}
        size={'medium'}
        renderMenuItems={renderOptions}
        control={control}
        id={name}
      />
    </Grid>
  )
}

const FieldComponent = ({ specification, control }: { specification: any; control: any }) => {
  const { name, data_type, options } = specification || {}
  const fieldProps = { control, name }

  const field: Fields = {
    text: <TextFieldComponent {...fieldProps} />,
    drop_down: <DropdownComponent {...fieldProps} options={options}  />,
    nested_drop_down : <DropdownComponent {...fieldProps} options={options}  />
  }

  return field[data_type as FieldDataTypes]
}

export default FieldComponent
