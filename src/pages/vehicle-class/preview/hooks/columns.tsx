import { Box, Typography } from '@mui/material'
import BasicTableActions from 'src/components/BasicTableActions'

interface CellType {
  specification: {
    name: string
  }
  id: string
}

const useGetVehicleClassSpecCols = (props: { handleDelete: (id: string) => void }) => {
  const { handleDelete } = props

  const columns = [
    {
      flex: 0.1,
      field: 'name',
      minWidth: 220,
      headerName: 'Name',
      renderCell: ({ row }: { row: CellType }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                {row?.specification?.name}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.035,
      minWidth: 100,
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params: CellType) => {
        return <BasicTableActions handleDelete={() => handleDelete(params?.id)} />
      }
    }
  ]

  return columns
}

export default useGetVehicleClassSpecCols
