import { Box, Card, CardHeader, Divider, Grid } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import TableHeader from 'src/components/TableHeader'
import useGetArticleCols from './hooks/useGetArticleCols'
import { useRouter } from 'next/router'

const Articles = () => {

    const router = useRouter()

  function handleAdd() {
    console.log('')
    router.push('/articles/add')
  }

  function handleDelete(id: number) {
    console.log(id)
  }

  function handleEdit(id: number) {
    console.log(id)
  }

  const columns = useGetArticleCols({
    handleDelete,
    handleEdit
  })

  return (
    <Grid>
      <Card>
        <CardHeader title='Articles' />
        <Divider />
        <Divider />

        <TableHeader title='Article' handleNew={handleAdd} paddingX={7.5} />
        <Box sx={{ height: '100%' }}>
          <DataGrid
            autoHeight
            pagination
            disableRowSelectionOnClick
            rows={[]}
            columns={columns}
            rowCount={0}
            paginationMode='server'
            pageSizeOptions={[]}
          />
        </Box>
      </Card>
    </Grid>
  )
}

export default Articles
