import { Box, Card, CardHeader, Divider, Grid } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import DeleteConfirmModal from 'src/components/modals/DeleteConfirmModal'
import { useState } from 'react'
import TableHeader from '../../components/TableHeader'
import { useFieldArray, useForm } from 'react-hook-form'
import { useDeleteVehicleClass } from 'src/api/services/vehicle-class/delete'
import { useQueryClient } from '@tanstack/react-query'
import useCustomToast from 'src/lib/toast'
import { SpecFields } from 'src/types/SpecFields'
import useGetSpecCols from './hooks/columns'
import { useGetSpecsData } from 'src/api/services/specifications/get'
import SpecDrawer from './components/SpecDrawer'
import { useAddSpecification } from 'src/api/services/specifications/post'

const defaultValues: SpecFields = {
  name: '',
  data_type: 'text',
  options: null,
  specification_category_id: ''
}

const Specifications = () => {
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [idToRemove, setIdToRemove] = useState('')
  const [selectedData, setSelectedData] = useState<SpecFields>({
    name: '',
    data_type: 'text',
    options: null,
    specification_category_id: ''
  })
  const [openDrawer, setOpenDrawer] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<SpecFields>({
    defaultValues
  })

  const options = useFieldArray({
    control,
    name: 'options'
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
  const handleEdit = (params: SpecFields) => {
    handleOpenDrawer()
    setSelectedData(params)
  }
  const handleAdd = () => {
    setSelectedData(defaultValues)
    handleOpenDrawer()
  }

  const deleteVehicleClass = useDeleteVehicleClass()
  const { columns } = useGetSpecCols({ handleDelete, handleEdit })

  const addSpec = useAddSpecification()

  const { data: specs, isLoading } = useGetSpecsData()
  const { data: specsData } = specs?.data || {}

  const isEdit = Boolean(selectedData?.name)

  function handleVehicleSuccess() {
    queryClient.invalidateQueries({ queryKey: ['vehicle-class'] })
    handleOpenDrawer()
    toast.success(`Successfully ${isEdit ? 'Updated' : 'Created'}`)
    reset()
  }

  const mutationFn:any = addSpec

  function onSubmit(values: SpecFields) {
    const { name, data_type, options, specification_category_id } = values
   
    const specData = {
      name,
      data_type,
      specification_category_id,
      ...(data_type === 'drop_down' && { options: options })
    }
    const queryParams = isEdit ? { data: specData, id: selectedData?.id } : { ...specData }
    mutationFn.mutate(queryParams, {
      onSuccess: () => handleVehicleSuccess()
    })
  }

  return (
    <Grid>
      <Card>
        <CardHeader title='Specifications' />
        <Divider />
        <TableHeader title='Specifications' handleNew={handleAdd} />
        <Box sx={{ height: '100%' }}>
          <DataGrid disableRowSelectionOnClick loading={isLoading} columns={columns as any} rows={specsData ?? []} />
        </Box>
      </Card>
      {/* <VehicleClassDrawer
        open={openDrawer}
        setOpen={setOpenDrawer}
        control={control}
        errors={errors}
        apiError={addVehicleClass?.error}
        setSelectedData={setSelectedData}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      /> */}
      <SpecDrawer
        open={openDrawer}
        setOpen={setOpenDrawer}
        control={control}
        errors={errors}
        apiError={mutationFn?.error}
        setSelectedData={setSelectedData}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        options={options}
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
export default Specifications
