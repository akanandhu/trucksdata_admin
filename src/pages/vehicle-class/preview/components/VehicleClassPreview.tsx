import { Button, Card, CardHeader, Divider, Grid, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useGetVehicleClass } from 'src/api/services/vehicle-class/get'
import useCustomToast from 'src/lib/toast'
import { useQueryClient } from '@tanstack/react-query'
import DeleteConfirmModal from 'src/components/modals/DeleteConfirmModal'
import usePrefillSeries from 'src/pages/manufacturers/preview/hooks/prefill'
import { DataGrid } from '@mui/x-data-grid'
import { useGetVehicleClassSpecs } from 'src/api/services/vehicle-class/specifications/get'
import FallbackSpinner from 'src/@core/components/spinner'
import AddVehicleClassSpecs from './AddVehicleClassSpecs'
import { useAddSpecsToClass } from 'src/api/services/vehicle-class/specifications/post'
import { useGetSpecsDataPagination } from 'src/api/services/specifications/get'
import getFlatData from 'src/utils/get-data-flat'
import getArrayFlat from 'src/utils/get-array-flat'
import { useReloadOnPageScroll } from 'src/hooks/useReloadOnScroll'
import { useInView } from 'react-intersection-observer'
import { useRouter } from 'next/router'
import { useDeleteVehicleClassSpec } from 'src/api/services/vehicle-class/specifications/delete'
import useGetVehicleClassSpecCols from '../hooks/columns'

const VehicleClassPreview = () => {
  const router = useRouter()
  const id = router?.query?.id as any
  const queryClient = useQueryClient()

  const [open, setOpen] = useState(false)
  const [selectedData, setSelectedData] = useState<any>({})
  const [openConfirmation, setOpenConfirmation] = useState(false)
  const [idsToDelete, setIdsToDelete] = useState('')

  // const [energyId, setEnergyId] = useState('')

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm()

  const deleteFn = useDeleteVehicleClassSpec()
  const addSpecsToClass = useAddSpecsToClass()
  const toast = useCustomToast()

  const isEdit = Boolean(selectedData?.title)

  const mutationFn: any = addSpecsToClass

  const { data } = useGetVehicleClass(id)
  const energySources = data?.data?.energy_sources ?? []
  const energyId = energySources?.[0]?.id

  const [selectedId, setSelectedId] = useState(energyId)

  const { data: classSpecs } = useGetVehicleClassSpecs({
    vehicle_type_id: id as string,
    energy_source_id: selectedId ?? energyId
  })
  const classSpecData = classSpecs?.data

  const { data: specs, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } = useGetSpecsDataPagination()
  const flatSpecs = getFlatData(specs)
  const specData = getArrayFlat(flatSpecs ?? [])
  const { inView, ref } = useInView()

  useReloadOnPageScroll({
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    inView
  })

  function handleAddModal() {
    setOpen(!open)
  }

  function handleSuccess() {
    toast.success(`Specifications ${isEdit ? 'Updated' : 'Created'} Successfully`)
    queryClient.invalidateQueries({ queryKey: ['vehicle-class-specs'] })
    setOpen(!open)
  }

  function onSubmit(values: any) {
    const data = {
      vehicle_type_id: id,
      specifications : values?.specifications?.map((specId: string) => {
        return {
          energy_source_id: values?.energy_source_id,
          specification_id: specId
        }
      })
    }

    const queryData = isEdit ? { id: selectedData?.id, data } : data
    mutationFn.mutate(queryData, {
      onSuccess: () => handleSuccess()
    })
  }

  function handleEnergyChange(e: SelectChangeEvent<any>) {
    setSelectedId(e.target.value)
  }

  function handleClose() {
    setOpen(!open)
    setSelectedData({
      id: '',
      status: 'active',
      title: '',
      name: ''
    })
    mutationFn.reset()
  }

  usePrefillSeries({
    selectedData,
    setValue
  })


  const handleDelete = (id: string) => {
    setOpenConfirmation(!openConfirmation)
    setIdsToDelete(id)
  }

  const columns = useGetVehicleClassSpecCols({
    handleDelete
  })

  if (isLoading) {
    return <FallbackSpinner />
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardHeader title={data?.data?.name} />
            </Card>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <CardHeader title='Specifications' />
              </Grid>
              <Divider />
              <Grid display={'flex'} justifyContent={'flex-end'} padding={4} paddingX={5}>
                <Select defaultValue={energyId} size={'small'} value={selectedId} onChange={e => handleEnergyChange(e)}>
                  {energySources?.map((energy: { id: number; name: string }) => {
                    return (
                      <MenuItem key={energy.id} value={energy.id}>
                        {energy.name}
                      </MenuItem>
                    )
                  })}
                </Select>
              </Grid>
              <Divider />

              <Grid display={'flex'} justifyContent={'flex-end'} padding={4} paddingX={5}>
                <Button onClick={handleAddModal} variant='contained'>
                  Add Specifications
                </Button>
              </Grid>
              <Divider />
              <DataGrid disableRowSelectionOnClick columns={columns as any} rows={classSpecData ?? []} />
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <AddVehicleClassSpecs
        open={open}
        handleClose={handleClose}
        energySources={energySources}
        error={errors}
        handleSubmit={handleSubmit}
        isLoading={mutationFn.isLoading}
        onSubmit={onSubmit}
        apiError={mutationFn.errors}
        control={control}
        specs={specData}
        ref={ref}
      />
      <DeleteConfirmModal
        open={openConfirmation}
        setOpen={setOpenConfirmation}
        remove={deleteFn}
        idToRemove={idsToDelete}
        routeToInvalidate='vehicle-class-specs'
      />
    </Grid>
  )
}

export default VehicleClassPreview
