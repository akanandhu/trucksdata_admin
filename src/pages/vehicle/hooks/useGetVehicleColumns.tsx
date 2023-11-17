import { Box, Chip, Grid, Typography } from '@mui/material'
import React from 'react'
import BasicTableActions from 'src/components/BasicTableActions'

const useGetVehicleColumns = ({
  handleEdit,
  handleDelete
}: {
  handleEdit: (id: number) => void
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

        console.log(row, 'rowCheck')

        return (
          <Grid>
            {row.vehicle_class && <Chip sx={{ marginX: 1 }} key={row.vehicle_class} label={row.vehicle_class} />}
          </Grid>
        )
      }
    },

    {
      flex: 0.1,
      field: 'vehicle_brand',
      minWidth: 50,
      headerName: 'Vehicle Brand',
      renderCell: ({ row }: any) => {
        const { vehicle_brand } = row

        return (
          <Grid>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 700 }}>
              {vehicle_brand}
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

        return <BasicTableActions handleDelete={() => handleDelete(id)} handleEdit={() => handleEdit(id)} />
      }
    }
  ]

  return columns
}

export default useGetVehicleColumns
