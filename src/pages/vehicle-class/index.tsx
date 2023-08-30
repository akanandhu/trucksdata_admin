import { Box, Card, CardHeader, Divider, Grid } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { rows } from 'src/fake-data/rows'
import useGetVehicleClassCols from './hooks/columns'
import DeleteConfirmModal from 'src/components/modals/DeleteConfirmModal'
import { useState } from 'react'
import TableHeader from '../../components/TableHeader'
import VehicleClassDrawer from './components/VehicleClassDrawer'
import { useForm } from 'react-hook-form'
import { VehicleClassFields } from 'src/types/VehicleClass'
import usePrefillVehicleClass from './hooks/prefill'

const defaultValues: VehicleClassFields = {
  id: '',
  title: '',
  status: 'active'
}

const VehicleClass = () => {
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [idToRemove, setIdToRemove] = useState('')
  const [data, setData] = useState(rows)
  const [selectedData, setSelectedData] = useState<VehicleClassFields>({
    id: '',
    title: '',
    status: 'active'
  })

  const [openDrawer, setOpenDrawer] = useState(false)

  const {
    control,
    setValue,
    formState: { errors }
  } = useForm<VehicleClassFields>({
    defaultValues
  })

  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer)
  }
  const handleDelete = (id: string) => {
    setIdToRemove(id)
    setDeleteConfirm(true)
  }
  const handleEdit = (params: VehicleClassFields) => {
    handleOpenDrawer()
    setSelectedData(params)
  }
  const handleAdd = () => {
    setSelectedData(defaultValues)
    handleOpenDrawer()
  }

  const { columns } = useGetVehicleClassCols({ handleDelete, handleEdit })

  usePrefillVehicleClass({ selectedData, setValue })

  return (
    <Grid>
      <Card>
        <CardHeader title='Vehicle Class' />
        <Divider />
        <TableHeader title='Vehicle Class' handleNew={handleAdd} />
        <Box sx={{ height: '100%' }}>
          <DataGrid disableRowSelectionOnClick columns={columns as any} rows={data} />
        </Box>
      </Card>
      <VehicleClassDrawer open={openDrawer} setOpen={setOpenDrawer} control={control} errors={errors} />
      <DeleteConfirmModal
        open={deleteConfirm}
        setOpen={setDeleteConfirm}
        remove={data}
        idToRemove={idToRemove}
        setRemoved={setData}
      />
    </Grid>
  )
}
export default VehicleClass
