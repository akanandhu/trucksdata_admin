import { Box, Card, CardHeader, Divider } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import useGetUserCols from './hooks/columns'
import { useGetUsers } from 'src/api/services/user-data/get'

const Users = () => {
  const [params, setParams] = useState({
    page: 0,
    pageSize: 15
  })
  const { columns } = useGetUserCols()
  const { data: users } = useGetUsers(params)
  const userData = users?.data?.data

  return (
    <Card>
      <CardHeader title='User Data' />
      <Divider />
      <Box sx={{ height: '100%' }}>
        <DataGrid
          disableRowSelectionOnClick
          columns={columns}
          rows={userData || []}
          rowCount={users?.data?.total || 0}
          paginationMode='server'
          paginationModel={params}
          onPaginationModelChange={setParams}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 15 } } }}
        />
      </Box>
    </Card>
  )
}

export default Users
