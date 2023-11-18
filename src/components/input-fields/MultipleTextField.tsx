import React, { useState } from 'react'
import { Box, TextField, Autocomplete, Chip } from '@mui/material'
import { Controller } from 'react-hook-form'

interface Props {
  control: any
  label: string
  fieldName: string
  textFieldType: string
  marginTop?: number
}

function MultipleTextField(props: Props) {
  const { control, label, fieldName, textFieldType, marginTop } = props

  const [currentText, setCurrentText] = useState('')

  return (
    <div>
      <Box mt={marginTop ?? 2}>
        <Controller
          control={control}
          name={fieldName}
          render={({ field: { value, onChange, onBlur } }) => (
            <Autocomplete
              multiple
              id='tags-filled'
              options={[currentText]}
              freeSolo
              value={value}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <Chip variant='outlined' label={option} {...getTagProps({ index })} />
                ))
              }
              onBlur={onBlur}
              onChange={(event, values) => {
                onChange(values)
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  label={label}
                  type={textFieldType}
                  onChange={e => setCurrentText(e.target.value)}
                />
              )}
            />
          )}
        />
      </Box>
    </div>
  )
}

export default MultipleTextField
