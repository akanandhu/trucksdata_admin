import React from 'react'
import { FormHelperText } from '@mui/material'
import { errorMessageParser } from 'src/utils/error-message-parser'

function ErrorBox({ error }: { error: any }) {
  const errorMessage = errorMessageParser(error)

  return (
    <>
      <FormHelperText sx={{ color: 'error.main' }}>{errorMessage}</FormHelperText>
    </>
  )
}

export default ErrorBox
