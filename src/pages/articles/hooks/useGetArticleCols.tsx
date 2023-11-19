import { Box, Typography } from '@mui/material'
import React from 'react'
import BasicTableActions from 'src/components/BasicTableActions'

const useGetArticleCols = ({
  handleDelete,
  handleEdit
}: {
  handleDelete: (id: number) => void
  handleEdit: (id: number) => void
}) => {
  const columns = [
    {
      flex: 0.015,
      field: 'id',
      minWidth: 200,
      headerName: 'Id'
    },
    {
      flex: 0.1,
      field: 'name',
      minWidth: 220,
      headerName: 'Article Heading',
      renderCell: ({ row }: any) => {
        const { title } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 700 }}>
              {title}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      field: 'author',
      minWidth: 50,
      headerName: 'Author',
      renderCell: ({ row }: any) => {
        const { vehicle_type } = row || {}

        return (
          <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 700 }}>
            {vehicle_type?.name}
          </Typography>
        )
      }
    },
    {
      flex: 0.05,
      field: 'actions',
      minWidth: 40,
      headerName: 'Actions',
      renderCell: (params: any) => {
        const { id } = params.row

        return <BasicTableActions handleDelete={() => handleDelete(id)} handleEdit={() => handleEdit(id)} />
      }
    }
  ]

  return columns
}

export default useGetArticleCols
