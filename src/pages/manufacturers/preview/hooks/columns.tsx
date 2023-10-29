import { Box, Typography } from '@mui/material'
import BasicTableActions from 'src/components/BasicTableActions'

interface CellType {
  row: any
}

const useSeriesColumns = (props: { handleEdit: any, handleDelete: (id: string) => void }) => {
  const { handleEdit, handleDelete } = props

  const columns = [
    {
      flex: 0.1,
      field: 'name',
      minWidth: 220,
      headerName: 'Name',
      renderCell: ({ row }: CellType) => {
        const { title } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                {title}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.075,
      minWidth: 105,
      field: 'vehicle_class',
      headerName: 'Vehicle Class',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.vehicle_type_id}</Typography>
      )
    },
    {
      flex: 0.035,
      minWidth: 100,
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params: any) => {
        return <BasicTableActions handleDelete={() => handleDelete(params?.id)} handleEdit={() => handleEdit(params?.row)} />
      }
    }
  ]

  return columns
}

export default useSeriesColumns
