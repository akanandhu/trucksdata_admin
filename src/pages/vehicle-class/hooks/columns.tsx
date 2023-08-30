import BasicTableActions from 'src/components/BasicTableActions'

interface Props {
  handleEdit : (id: string) => void
  handleDelete: (id: string) => void
}

const useGetVehicleClassCols = ({handleEdit, handleDelete}:Props) => {

  const columns = [
    {
      flex: 0.1,
      field: 'id',
      minWidth: 80,
      headerName: 'ID',
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
      headerName: 'Status'
    },
    {
      flex: 0.1,
      field: 'actions',
      minWidth: 40,
      headerName: 'Actions',
      renderCell: (params: { id: string }) => {
        const { id } = params

        return <BasicTableActions handleDelete={() => handleDelete(id)} handleEdit={() => handleEdit(id)} />
      }
    }
  ]

  return {columns}
}
export default useGetVehicleClassCols
