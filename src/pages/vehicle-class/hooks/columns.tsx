import { Chip, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import BasicTableActions from 'src/components/BasicTableActions'
import { VehicleClassFields } from 'src/types/VehicleClass'
import { capitaliseFirstLetter } from 'src/utils/capitalise-first-letter'

interface Props {
  handleEdit: (params: VehicleClassFields) => void
  handleDelete: (id: string) => void
}

interface RowType {
  status: 'active' | 'inactive'
  name: string
  id: string
}

interface ParamsRow {
  row: RowType
}

const useGetVehicleClassCols = ({ handleEdit, handleDelete }: Props) => {
  const router = useRouter()

  const columns = [
    {
      flex: 0.1,
      field: 'id',
      minWidth: 80,
      headerName: 'Id',
      renderCell: (params: ParamsRow) => {
        const { row } = params

        return <Typography>{row?.id}</Typography>
      }
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'title',
      headerName: 'Title',
      renderCell: (params: ParamsRow) => {
        const { row } = params

        return <Typography>{row?.name}</Typography>
      }
    },
    {
      flex: 0.075,
      field: 'status',
      minWidth: 80,
      headerName: 'Status',
      renderCell: (params: ParamsRow) => {
        const { status } = params.row
        const statusColor = status === 'active' ? 'success' : 'secondary'

        return status ? <Chip label={capitaliseFirstLetter(status ?? '')} color={statusColor} /> : '-'
      }
    },
    {
      flex: 0.1,
      field: 'actions',
      minWidth: 40,
      headerName: 'Actions',
      renderCell: (params: { row: VehicleClassFields }) => {
        const { id } = params.row

        return (
          <BasicTableActions
            handleView={() => router.push(`/vehicle-class/preview/${id}`)}
            handleDelete={() => handleDelete(id as string)}
            handleEdit={() => handleEdit(params.row)}
          />
        )
      }
    }
  ]

  return { columns }
}
export default useGetVehicleClassCols
