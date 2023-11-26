import { Box, Card, CardHeader, Divider } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import useGetUserCols from './hooks/columns'
import { useGetUsers } from 'src/api/services/user-data/get'

const Users = () => {

    const {columns} = useGetUserCols()
    const {data: users} = useGetUsers()
    const userData = users?.data?.data

  return (
    <Card>
      <CardHeader title='User Data' />
      <Divider />
      <Box sx={{ height: '100%' }}>
        <DataGrid
          autoHeight
          pagination
          disableRowSelectionOnClick
          rows={userData ?? []}
          columns={columns}
          rowCount={0}
          paginationMode='server'
          pageSizeOptions={[]}
        />
      </Box>
    </Card>
  )
}

export default Users
