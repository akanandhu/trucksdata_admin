import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import Chip from 'src/@core/components/mui/chip'
import BasicTableActions from 'src/components/BasicTableActions'
import { renderName } from 'src/utils/render-avatar'

interface RowTypes {
  id: string
  name: string
  vehicle_types: any[]
}

interface ParamTypes {
  row: RowTypes
}

const useGetManufacturersCols = ({
  handleEdit,
  handleView
}: {
  handleEdit: (id: any) => void
  handleView: (id: string) => void
}) => {
  const columns = [
    {
      flex: 0.01,
      field: 'id',
      minWidth: 150,
      headerName: 'Id'
    },
    {
      flex: 0.1,
      field: 'name',
      minWidth: 220,
      headerName: 'Name',
      renderCell: ({ row }: ParamTypes) => {
        const { name } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderName(row)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 700 }}>
                {name}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      field: 'vehicle_classes',
      minWidth: 50,
      headerName: 'Vehicle Class',
      renderCell: ({ row }: ParamTypes) => {

        console.log(row, 'rowCheck')

        return (
          <Grid>
            {row.vehicle_types?.map(vehicle_type => (
              <Chip sx={{ marginX: 1 }} key={vehicle_type?.id} label={vehicle_type?.name} />
            ))}
          </Grid>
        )
      }
    },
    {
      flex: 0.04,
      field: 'actions',
      minWidth: 40,
      headerName: 'Actions',
      renderCell: (params: ParamTypes) => {
        const { id } = params.row

        return <BasicTableActions handleView={() => handleView(id)} handleEdit={() => handleEdit(params?.row)} />
      }
    }
  ]

  return {
    columns
  }
}
export default useGetManufacturersCols
