import { Chip } from '@mui/material'
import BasicTableActions from 'src/components/BasicTableActions'
import { VehicleClassFields } from 'src/types/VehicleClass'
import { capitaliseFirstLetter } from 'src/utils/capitalise-first-letter'

interface Props {
  handleEdit: (params: VehicleClassFields) => void
  handleDelete: (id: string) => void
}
interface RowType {
  status: 'active' | 'inactive'
}
interface ParamsRow {
  row: RowType
}

const useGetVehicleClassCols = ({ handleEdit, handleDelete }: Props) => {
  const columns = [
    {
      flex: 0.1,
      field: 'id',
      minWidth: 80,
      headerName: 'Id',
      type: ''
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'title',
      headerName: 'Title'
    },
    {
      flex: 0.075,
      field: 'status',
      minWidth: 80,
      headerName: 'Status',
      renderCell: (params: ParamsRow) => {
        const { status } = params.row
        const statusColor = status === 'active' ? 'success' : 'secondary'

        return <Chip label={capitaliseFirstLetter(status)} color={statusColor} />
      }
    },
    {
      flex: 0.1,
      field: 'actions',
      minWidth: 40,
      headerName: 'Actions',
      renderCell: (params: {row: VehicleClassFields}) => {
        const { id } = params.row

        return <BasicTableActions handleDelete={() => handleDelete(id)} handleEdit={() => handleEdit(params.row)} />
      }
    }
  ]

  return { columns }
}
export default useGetVehicleClassCols
