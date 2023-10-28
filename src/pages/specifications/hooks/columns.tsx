import { Typography } from '@mui/material'
import BasicTableActions from 'src/components/BasicTableActions'
import { FieldDataTypes, SpecFields } from 'src/types/SpecFields'
import { removeUnderScore } from 'src/utils/remove_underscore'

interface Props {
  handleEdit: (params: SpecFields) => void
  handleDelete: (id: string) => void
}

interface RowType {
  data_type: FieldDataTypes
  name: string
  id: string
}

interface ParamsRow {
  row: RowType
}

const useGetSpecCols = ({ handleEdit, handleDelete }: Props) => {

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
      field: 'name',
      headerName: 'Name',
      renderCell: (params: ParamsRow) => {
        const { row } = params

        return <Typography>{row?.name}</Typography>
      }
    },
    {
      flex: 0.12,
      field: 'type',
      minWidth: 80,
      headerName: 'Type',
      renderCell: (params: ParamsRow) => {
        const { data_type } = params.row

        return <Typography>{removeUnderScore(data_type ?? '')}</Typography>
      }
    },
    {
      flex: 0.1,
      field: 'actions',
      minWidth: 40,
      headerName: 'Actions',
      renderCell: (params: { row: SpecFields }) => {
        const { id } = params.row

        return (
          <BasicTableActions
            handleDelete={() => handleDelete(id as string)}
            handleEdit={() => handleEdit(params.row)}
          />
        )
      }
    }
  ]

  return { columns }
}
export default useGetSpecCols
