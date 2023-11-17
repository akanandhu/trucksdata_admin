import Card from '@mui/material/Card'
import { DataGrid } from '@mui/x-data-grid'
import CardHeader from '@mui/material/CardHeader'
import { Divider } from '@mui/material'
import SearchHeader from './SearchHeader'
import TableHeader from 'src/components/TableHeader'
import { SetStateAction } from 'react'

const ModelsTable = ({
  // id,
  data,
  handleAddNew,
  handleSubmit,
  onSubmit,
  control,
  vehicle_classes,
  columns,
  setVehicleId
}: {
  id: any
  data: any
  handleAddNew: () => void
  handleSubmit: any
  onSubmit: any
  control: any
  vehicle_classes: any
  columns: any
  setVehicleId: React.Dispatch<SetStateAction<any>>
}) => {
  // ** State

  const handleAddNewModal = () => {
    handleAddNew()
  }

  return (
    <Card>
      <CardHeader title='Models' />
      <Divider />
      <SearchHeader
        vehicle_classes={vehicle_classes}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        control={control}
        setVehicleId={setVehicleId}
      />
      <Divider />
      <TableHeader title='Model' handleNew={handleAddNewModal} paddingX={17} />
      <DataGrid autoHeight disableRowSelectionOnClick pagination pageSizeOptions={[]}  rows={data ?? []} rowHeight={60} columns={columns} />
    </Card>
  )
}

export default ModelsTable
