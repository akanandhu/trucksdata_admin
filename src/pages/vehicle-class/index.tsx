import { Box, Card, CardHeader, Divider, Grid } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import useGetVehicleClassCols from './hooks/columns'
import DeleteConfirmModal from 'src/components/modals/DeleteConfirmModal'
import { useState } from 'react'
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
import FallbackSpinner from 'src/@core/components/spinner'
import { useGetEnergySources } from 'src/api/services/energy/get'

const defaultValues: VehicleClassFields = {
  id: '',
  title: '',
  status: 'active',
  name: '',
  energy_sources: []
}

const VehicleClass = () => {
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [idToRemove, setIdToRemove] = useState('')
  const [selectedData, setSelectedData] = useState<VehicleClassFields>({
    id: '',
    name: '',
    status: 'active',
    energy_sources: []
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

  const addVehicleClass = useAddVehicleClass()
  const editVehicleClass = useEditVehicleClass()

  const { data } = useGetEnergySources()
  const energy = data?.data?.data ?? []

  const { data: vehicleClass, isLoading } = useGetVehicleClasses()
  const { data: vehicleClassData } = vehicleClass?.data || {}

  const isEdit = Boolean(selectedData?.name)

  function handleVehicleSuccess() {
    queryClient.invalidateQueries({ queryKey: ['vehicle-class'] })
    handleOpenDrawer()
    toast.success(`Successfully ${isEdit ? 'Updated' : 'Created'}`)
    reset()
  }

  const mutationFn: any = isEdit ? editVehicleClass : addVehicleClass

  function onSubmit(values: VehicleClassFields) {
    const { name, status, energy_sources } = values
    const vehicleData: any = {
      name,
      status,
      energy_sources: energySources(energy_sources)
    }
    const queryParams = isEdit ? { data: vehicleData, id: selectedData?.id } : { ...vehicleData }
    mutationFn.mutate(queryParams, {
      onSuccess: () => handleVehicleSuccess()
    })
  }

  function energySources(energy_sources: any[]) {
    return energy_sources?.map((source: any) => {
      const energyObj = energy?.find((item: { name: string }) => item.name === source)

      return {
        energy_source_id: energyObj?.id
      }
    })
  }

  if (isLoading) {
    return <FallbackSpinner />
  }

  function clearError() {
    addVehicleClass.reset()
    editVehicleClass.reset()
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
            pageSizeOptions={[]}
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
        clearError={clearError}
        energy={energy ?? []}
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
