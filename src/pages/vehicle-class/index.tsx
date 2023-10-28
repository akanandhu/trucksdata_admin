import { Box, Card, CardHeader, Divider, Grid } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import useGetVehicleClassCols from './hooks/columns'
import DeleteConfirmModal from 'src/components/modals/DeleteConfirmModal'
import { useEffect, useState } from 'react'
import TableHeader from '../../components/TableHeader'
import VehicleClassDrawer from './components/VehicleClassDrawer'
import { useForm } from 'react-hook-form'
import { VehicleClassFields } from 'src/types/VehicleClass'
import usePrefillVehicleClass from './hooks/prefill'
import { useGetVehicleClasses } from 'src/api/services/vehicle-class/get'
import { useDeleteVehicleClass } from 'src/api/services/vehicle-class/delete'
import { useQueryClient } from '@tanstack/react-query'
import { useAddVehicleClass } from 'src/api/services/vehicle-class/post'
import useCustomToast from 'src/lib/toast'
import { useEditVehicleClass } from 'src/api/services/vehicle-class/patch'

const defaultValues: VehicleClassFields = {
  id: '',
  title: '',
  status: 'active',
  name: ''
}

const VehicleClass = () => {
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [idToRemove, setIdToRemove] = useState('')
  const [selectedData, setSelectedData] = useState<VehicleClassFields>({
    id: '',
    name: '',
    status: 'active'
  })

  const [openDrawer, setOpenDrawer] = useState(false)

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<VehicleClassFields>({
    defaultValues
  })

  const queryClient = useQueryClient()
  const toast = useCustomToast()

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

  const deleteVehicleClass = useDeleteVehicleClass()
  const { columns } = useGetVehicleClassCols({ handleDelete, handleEdit })

  usePrefillVehicleClass({ selectedData, setValue })
  useEffect(() => {
    setValue('name', selectedData?.name)
    setValue('status', selectedData?.status)
  }, [selectedData, setValue])

  const addVehicleClass = useAddVehicleClass()
  const editVehicleClass = useEditVehicleClass()

  const { data: vehicleClass, isLoading } = useGetVehicleClasses()
  const { data: vehicleClassData } = vehicleClass?.data || {}

  function handleVehicleSuccess() {
    queryClient.invalidateQueries({ queryKey: ['vehicle-class'] })
    handleOpenDrawer()
    toast.success('Successfully Created')
    reset()
  }

  const mutationFn: any = selectedData?.name ? editVehicleClass : addVehicleClass

  function onSubmit(values: VehicleClassFields) {
    const { name, status } = values
    const vehicleData: any = {
      name,
      status
    }
    const queryParams = selectedData?.name ? { data: vehicleData, id: selectedData?.id } : { ...vehicleData }
    mutationFn.mutate(queryParams, {
      onSuccess: () => handleVehicleSuccess()
    })
  }

  return (
    <Grid>
      <Card>
        <CardHeader title='Vehicle Class' />
        <Divider />
        <TableHeader title='Vehicle Class' handleNew={handleAdd} />
        <Box sx={{ height: '100%' }}>
          <DataGrid
            disableRowSelectionOnClick
            loading={isLoading}
            columns={columns as any}
            rows={vehicleClassData ?? []}
          />
        </Box>
      </Card>
      <VehicleClassDrawer
        open={openDrawer}
        setOpen={setOpenDrawer}
        control={control}
        errors={errors}
        apiError={addVehicleClass?.error}
        setSelectedData={setSelectedData}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      />
      <DeleteConfirmModal
        open={deleteConfirm}
        setOpen={setDeleteConfirm}
        remove={deleteVehicleClass}
        idToRemove={idToRemove}
        routeToInvalidate='vehicle-class'
      />
    </Grid>
  )
}
export default VehicleClass
