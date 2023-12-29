import { Box, Grid, Typography } from '@mui/material'
import BasicTableActions from 'src/components/BasicTableActions'

const useGetIndivitualVehicleSpecs = ({
  handleEdit,
  handleDelete
}: {
  handleEdit: (id: number) => void
  handleDelete: (id: number) => void
}) => {
  const columns = [
    {
      flex: 0.1,
      field: 'name',
      minWidth: 220,
      headerName: 'Specification Name',
      renderCell: ({ row }: any) => {
        const { specification } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 700 }}>
              {specification?.name}
            </Typography>
          </Box>
        )
      }
    },

    {
      flex: 0.1,
      field: 'value',
      minWidth: 50,
      headerName: 'Value',
      renderCell: ({ row }: any) => {
        const { values } = row
        const displayValue = values?.map((value: { value: string; child_values: any }) => {
          if (!value?.child_values?.length) {
            return value.value
          } else {
            return value?.child_values?.[0]?.value
          }
        })

        return (
          <Grid>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 700 }}>
              {displayValue?.join(', ')}
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

        return <BasicTableActions handleEdit={() => handleEdit(params)} handleDelete={() => handleDelete(id)} />
      }
    }
  ]

  return columns
}

export default useGetIndivitualVehicleSpecs
