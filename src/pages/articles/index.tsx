import { Box, Card, CardHeader, Divider, Grid } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import TableHeader from 'src/components/TableHeader'
import useGetArticleCols from './hooks/useGetArticleCols'
import { useRouter } from 'next/router'
import { useGetArticles } from 'src/api/services/articles/get'
import DeleteConfirmModal from 'src/components/modals/DeleteConfirmModal'
import { useRemoveArticle } from 'src/api/services/articles/delete'

const Articles = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [idToRemove, setIdToRemove] = useState<any>('')
  const remove = useRemoveArticle()

  function handleAdd() {
    router.push('/articles/add')
  }

  function handleDelete(id: number) {
    setIdToRemove(id)
    setOpen(!open)
  }

  function handleEdit(id: number) {
    router.push(`articles/add?id=${id}`)
  }

  const columns = useGetArticleCols({
    handleDelete,
    handleEdit
  })

  const [params, setParams] = useState({
    page: 0,
    pageSize: 15
  })
  const { data: articles } = useGetArticles(params)
  const articleList = articles?.data || []

  return (
    <Card>
      <Grid>
        <Card>
          <CardHeader title='Articles' />
          <Divider />
          <Divider />

          <TableHeader title='Article' handleNew={handleAdd}  paddingX={7.5} />
          <Box sx={{ height: '100%' }}>
            <DataGrid
             disableRowSelectionOnClick
             columns={columns}
             rows={articleList?.data || []}
             rowCount={articleList?.total || 0}
             paginationMode='server'
             paginationModel={params}
             onPaginationModelChange={setParams}
             initialState={{ pagination: { paginationModel: { page: 0, pageSize: 15 } } }}
            />
          </Box>
        </Card>
      </Grid>
      <DeleteConfirmModal
        idToRemove={idToRemove}
        open={open}
        remove={remove}
        routeToInvalidate='articles'
        setOpen={setOpen}
      />
    </Card>
  )
}

export default Articles
