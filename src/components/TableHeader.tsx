import { Box, Button } from '@mui/material'
import React from 'react'

const TableHeader = ({ title, handleNew }: { title: string; handleNew: () => void }) => {
  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'end'
      }}
    >
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button onClick={handleNew} sx={{ mb: 2 }} variant='contained'>
          + New {title}
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader