import { Grid } from '@mui/material'
import AboutBrand from './About'
import { useRouter } from 'next/router'
import AddModelDrawer from './AddModelDrawer'
import { useEffect, useState } from 'react'
import { useGetManufacturer } from 'src/api/services/manufacturers/get'
import { Datum } from 'src/types/ManufacturersModels'
import { useGetManufacturerSeries } from 'src/api/services/manufacturers/series/get'
import ModelsTable from './ModelsTable'
import { useForm } from 'react-hook-form'
import { useGetVehicleClasses } from 'src/api/services/vehicle-class/get'
import { useAddSeries } from 'src/api/services/manufacturers/series/post'
import useCustomToast from 'src/lib/toast'
import { useQueryClient } from '@tanstack/react-query'
import usePrefillSeries from '../hooks/prefill'
import  useSeriesColumns  from '../hooks/columns'
import { useEditSeries } from 'src/api/services/manufacturers/series/patch'
import DeleteConfirmModal from 'src/components/modals/DeleteConfirmModal'
import { useDeleteSeries } from 'src/api/services/manufacturers/series/delete'

const defaultValues = {
  vehicle_class: 1
}

const ManufacturersPreview = () => {
  const router = useRouter()
  const id = router?.query?.id as any

  const queryClient = useQueryClient()

  const [open, setOpen] = useState(false)
  const [selectedData, setSelectedData] = useState<any>({})
  const [openConfirmation, setOpenConfirmation] = useState(false)
  const [idsToDelete, setIdsToDelete] = useState('')

  const { handleSubmit, control, setValue } = useForm()
  const { handleSubmit: handleSubmitForm, control: control1 } = useForm({
    defaultValues
  })

  const deleteFn = useDeleteSeries()
  const { data: vehicle_classes } = useGetVehicleClasses()
  const addSeries = useAddSeries()
  const editSeries = useEditSeries()
  const toast = useCustomToast()

  const isEdit = Boolean(selectedData?.title)

  const mutationFn: any = isEdit ? editSeries : addSeries

  const [vehicleId, setVehicleId] = useState('')

  useEffect(() => {
    if (vehicle_classes) {
      const vehicleTypeId = vehicle_classes?.data?.data?.[0]?.id
      setVehicleId(vehicleTypeId)
    }
  }, [vehicle_classes])

  const manufacturer = useGetManufacturer(id as any)
  const { data: series } = useGetManufacturerSeries(id, {
    vehicle_type_id: vehicleId
  })
  const manufacturerDataFiltered = manufacturer?.data?.data?.data?.filter((item: Datum) => item.id === Number(id ?? 0))
  const dataObj = manufacturerDataFiltered?.[0]

  function handleAddModal() {
    setOpen(!open)
  }

  function onSubmit(values: any) {
    console.log(values, 'submitted')
  }

  function handleSuccess() {
    toast.success(`Series ${isEdit ? 'Updated' : 'Created'} Successfully`)
    queryClient.invalidateQueries({ queryKey: ['series'] })
    setOpen(!open)
  }

  function onSubmitDrawer(values: any) {
    const data = {
      ...values,
      manufacturer_id: id
    }
    const queryData = isEdit ? { id: selectedData?.id, data } : data
    mutationFn.mutate(queryData, {
      onSuccess: () => handleSuccess()
    })
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

  const handleEdit = (params: any) => {
    setOpen(!open)
    setSelectedData(params)
  }

  const handleDelete = (id: string) => {
    setOpenConfirmation(!openConfirmation)
    setIdsToDelete(id)
  }

  const columns = useSeriesColumns({
    handleEdit,
    handleDelete
  })

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <AboutBrand data={dataObj} />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ModelsTable
              id={id}
              data={series ?? []}
              handleAddNew={handleAddModal}
              handleSubmit={handleSubmitForm}
              onSubmit={onSubmit}
              control={control1}
              vehicle_classes={vehicle_classes}
              columns={columns}
              setVehicleId={setVehicleId}
            />
          </Grid>
        </Grid>
      </Grid>
      <AddModelDrawer
        open={open}
        vehicle_classes={vehicle_classes}
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmitDrawer}
        handleClose={handleClose}
      />  
      <DeleteConfirmModal
        open={openConfirmation}
        setOpen={setOpenConfirmation}
        remove={deleteFn}
        idToRemove={idsToDelete}
        routeToInvalidate='series'
      />
    </Grid>
  )
}

export default ManufacturersPreview
