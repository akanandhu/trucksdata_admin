import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import BasicTableActions from 'src/components/BasicTableActions'

const useGetVehicleColumns = ({
  handleView,
  handleDelete
}: {
  handleView: (id: number) => void
  handleDelete: (id: number) => void
}) => {
  const columns = [
    {
      flex: 0.1,
      field: 'id',
      minWidth: 200,
      headerName: 'Id'
    },
    {
      flex: 0.1,
      field: 'name',
      minWidth: 220,
      headerName: 'Variant Name',
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
      field: 'vehicle_class',
      minWidth: 50,
      headerName: 'Vehicle Class',
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
      flex: 0.1,
      field: 'vehicle_brand',
      minWidth: 50,
      headerName: 'Vehicle Brand',
      renderCell: ({ row }: any) => {
        const { manufacturer } = row

        return (
          <Grid>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 700 }}>
              {manufacturer?.name}
            </Typography>
          </Grid>
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

        return <BasicTableActions handleDelete={() => handleDelete(id)} handleView={() => handleView(id)} />
      }
    }
  ]

  return columns
}

export default useGetVehicleColumns
