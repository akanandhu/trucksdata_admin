import { Box, Typography } from '@mui/material'
import { format } from 'date-fns'
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
        const { heading } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 700 }}>
              {heading}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      field: 'created_at',
      minWidth: 50,
      headerName: 'Published On',
      renderCell: ({ row }: any) => {
        const { created_at } = row || {}
        console.log(row, 'rowCheck')

        return (
          <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 700 }}>
            {format(new Date(created_at), 'dd/MM/yyyy')}
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
