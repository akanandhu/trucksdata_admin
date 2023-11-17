import { Grid } from '@mui/material'
import React from 'react'
import { FieldDataTypes, Fields, OptionTypes } from 'src/types/SpecFields'
import TextFormField from './input-fields/TextFormField'
import SelectFormField from './input-fields/SelectFormField'
import { renderOptions } from './renderOptions'
import { renderParentMenuItems } from './renderParentMenuItems'
import { flattenOptions } from 'src/functions/flattenOptions'

const TextFieldComponent = ({ name, control }: { name: string; control: any }) => {
  return (
    <Grid item xs={12} sm={6}>
      <TextFormField control={control} id={name} label={name} size='medium' />
    </Grid>
  )
}

const DropdownComponent = ({
  name,
  control,
  options,
  isNested
}: {
  name: string
  control: any
  options: OptionTypes[]
  isNested?: boolean
}) => {
  const data = isNested ? flattenOptions(options) : options

  return (
    <Grid item xs={12} sm={6}>
      <SelectFormField
        label={name}
        data={data ?? []}
        size={'medium'}
        renderMenuItems={isNested ? renderParentMenuItems : renderOptions}
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
    drop_down: <DropdownComponent {...fieldProps} options={options} />,
    nested_drop_down: <DropdownComponent {...fieldProps} options={options} isNested />
  }

  return field[data_type as FieldDataTypes]
}

export default FieldComponent
