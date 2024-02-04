import { Grid } from '@mui/material'
import React from 'react'
import { FieldDataTypes, Fields, OptionTypes } from 'src/types/SpecFields'
import TextFormField from './input-fields/TextFormField'
import SelectFormField from './input-fields/SelectFormField'
import { renderOptions } from './renderOptions'
import { renderParentMenuItems } from './renderParentMenuItems'
import { flattenOptions } from 'src/functions/flattenOptions'

const TextFieldComponent = ({ name, control, label }: { name: string; control: any; label?: string }) => {
  return (
    <Grid item xs={12} sm={6}>
      <TextFormField control={control} id={name} label={label ?? name} size='medium' />
    </Grid>
  )
}

const DropdownComponent = ({
  name,
  control,
  options,
  isNested, 
  label
}: {
  name: string
  control: any
  options: OptionTypes[]
  isNested?: boolean
  label?: string
}) => {
  const data = isNested ? flattenOptions(options) : options

  return (
    <Grid item xs={12} sm={6}>
      <SelectFormField
        label={label ?? name}
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
  const { slug, data_type, options, name } = specification || {}
  const fieldProps = { control, name: slug, label: name }
  const field: Fields = {
    text: <TextFieldComponent {...fieldProps} />,
    drop_down: <DropdownComponent {...fieldProps} options={options} />,
    nested_drop_down: <DropdownComponent {...fieldProps} options={options} isNested />
  }

  return field[data_type as FieldDataTypes]
}

export default FieldComponent
