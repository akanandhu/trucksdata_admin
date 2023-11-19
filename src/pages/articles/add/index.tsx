import { Grid } from '@mui/material'
import React, { useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import EditorText from 'src/components/EditorText'

const ArticlesAdd = () => {
  const [value, setValue] = useState('')

  console.log(value, 'valueCheck')

  return (
    <Grid sx={{ p: 6, minHeight: '50vh', backgroundColor: 'white' }}>
      <EditorText text={value} setText={setValue} />
    </Grid>
  )
}

export default ArticlesAdd
