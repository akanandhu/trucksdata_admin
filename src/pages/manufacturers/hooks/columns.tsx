import { Box, Grid, Typography } from '@mui/material'
import Chip from 'src/@core/components/mui/chip'
import BasicTableActions from 'src/components/BasicTableActions'
import { renderName } from 'src/utils/render-avatar'

interface RowTypes {
  id: string
  title: string
  vehicle_classes: any[]
}

interface ParamTypes {
  row: RowTypes
}

const useGetManufacturersCols = ({
  handleEdit,
  handleView
}: {
  handleEdit: (id: string) => void
  handleView: (id: string) => void
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
      field: 'title',
      minWidth: 220,
      headerName: 'Title',
      renderCell: ({ row }: ParamTypes) => {
        const { title } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderName(row)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 700 }}>
                {title}
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
        return (
          <Grid>
            {row.vehicle_classes.map(vehicle_class => (
              <Chip sx={{ marginX: 1 }} key={vehicle_class} label={vehicle_class} />
            ))}
          </Grid>
        )
      }
    },
    {
      flex: 0.05,
      field: 'actions',
      minWidth: 40,
      headerName: 'Actions',
      renderCell: (params: ParamTypes) => {
        const { id } = params.row

        return (
          <BasicTableActions
            handleView={() => handleView(id)}
            handleEdit={() => handleEdit(id)}
          />
        )
      }
    }
  ]

  return {
    columns
  }
}
export default useGetManufacturersCols
