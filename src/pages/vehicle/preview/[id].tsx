import React, { useState } from 'react'
import VehicleBasicForm from '../add/components/VehicleBasicForm'
import { useForm } from 'react-hook-form'
import { Button, Card, Grid, Typography } from '@mui/material'
import usePrefillVehicle from '../add/hooks/usePrefillVehicle'
import { yupResolver } from '@hookform/resolvers/yup'
import useGetVehicleSchema from '../add/hooks/useGetVehicleSchema'
import { useGetVehicle } from 'src/api/services/vehicle/get'
import { useRouter } from 'next/router'
import { VehicleSubmitTypes } from 'src/types/VehicleSubmitTypes'
import { useGetVehicleClass, useGetVehicleClasses } from 'src/api/services/vehicle-class/get'
import { DataGrid } from '@mui/x-data-grid'
import useGetIndivitualVehicleSpecs from '../hooks/useGetIndivitualVehicleSpecs'
import AddNewVehicleSpec from '../components/drawers/AddNewVehicleSpec'
import { useDeleteVehicleSpecs } from 'src/api/services/vehicle/delete'
import DeleteConfirmModal from 'src/components/modals/DeleteConfirmModal'
import { useUpdateVehicle } from 'src/api/services/vehicle/patch'
import useCustomToast from 'src/lib/toast'
import { useQueryClient } from '@tanstack/react-query'

const defaultValues: VehicleSubmitTypes = {
  vehicle_type_id: '',
  energy_source_id: '',
  description: '',
  brochure: [],
  images: [],
  manufacturer_id: '',
  min_price: 0,
  max_price: 0,
  price_unit: 'Rs',
  title: '',
  status: '',
  video_links: [
    {
      url: '',
      language: ''
    }
  ],
  series_id: ''
}

const VehiclePreview = () => {
  const schema = useGetVehicleSchema()
  const router = useRouter()
  const id = router.query.id
  const { data, isFetched: vehicleFetched } = useGetVehicle(id as string)
  const vehicle = data?.data
  const vehicleSpecs = vehicle?.vehicle_specs ?? []

  const {
    control,
    reset,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const [selectedOption, setSelectedOption] = useState<any>({})

  // vehicle class
  const { data: vehicle_class_data } = useGetVehicleClasses()
  const vehicleClassData = vehicle_class_data?.data?.data

  const vehicleId = router?.query?.id

  const removeSpec = useDeleteVehicleSpecs(vehicleId as any)

  const [vehicleType, energySourceId, manufacturerId, isPop] = watch([
    'vehicle_type_id',
    'energy_source_id',
    'manufacturer_id',
    'is_popular'
  ])
  console.log(Boolean(isPop), 'isPopppp')

  const { data: vehicleClass } = useGetVehicleClass(vehicleType ?? 1)
  const vehicle_class = vehicleClass?.data
  const energyData = vehicle_class?.energy_sources
  const manufacturers = vehicle_class?.manufacturers
  const selectedManufacturer = manufacturers?.find((item: { id: string | number }) => item?.id === manufacturerId)
  const series = selectedManufacturer?.series

  const specsCollection = energyData?.filter((obj: { id: number }) => obj?.id === energySourceId)
  const specs = specsCollection?.[0]?.specifications

  const [refresh, setRefresh] = useState(0)

  usePrefillVehicle({
    reset,
    vehicle,
    vehicleFetched,
    setRefresh
  })

  const columns = useGetIndivitualVehicleSpecs({
    handleEdit,
    handleDelete
  })

  const [prefillData, setPrefillData] = useState<any>({})
  function handleEdit(obj: any) {
    const { row } = obj || {}
    const selectedSpec = specs?.find((spec: any) => spec?.specification_id === row?.specification_id)
    setSelectedOption({ ...row, options: selectedSpec?.specification?.options })
    setPrefillData(row)
    setOpenSpec(!openSpec)
  }


  const [openDelete, setOpenDelete] = useState(false)
  const [idToRemove, setIdToRemove] = useState<any>('')

  function handleDelete(id: number) {
    setOpenDelete(!openDelete)
    setIdToRemove(id)
  }

  const [openSpec, setOpenSpec] = useState(false)
  function handleAddSpec() {
    setOpenSpec(!openSpec)
    setPrefillData(null)
  }

  const update = useUpdateVehicle()

  function onSubmit(values: any) {
    delete values.price_unit
    const dataValues = { price_unit: 'Rs', ...values }
    const data: any = {
      id: vehicleId,
      data: dataValues
    }
    update.mutate(data, {
      onSuccess: () => handleSuccess()
    })
  }

  const toast = useCustomToast()
  const queryClient = useQueryClient()

  function handleSuccess() {
    toast.success('Vehicle updated successfully')
    queryClient.invalidateQueries({ queryKey: ['vehicle'] })
  }

  return (
    <>
      <Card sx={{ p: 5, my: 2 }}>
        <Typography fontSize={20}>Basic Vehicle Details</Typography>
      </Card>
      <Card sx={{ p: 10 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid key={`id_${refresh}`} container spacing={5}>
            <VehicleBasicForm
              vehicleClass={vehicleClassData ?? []}
              manufacturersData={manufacturers ?? []}
              series={series ?? []}
              energyData={energyData}
              errors={errors}
              step={1}
              control={control}
              specs={specs}
            />
          </Grid>
          <Grid display={'flex'} justifyContent={'end'} sx={{ my: 6 }}>
            <Button type='submit' variant='contained'>
              Save Changes
            </Button>
          </Grid>
        </form>
      </Card>
      <Card sx={{ p: 5, my: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Typography fontSize={20}>Vehicle Specifications</Typography>
        <Button onClick={handleAddSpec} variant='outlined'>
          Add New Specification
        </Button>
      </Card>
      <Grid container>
        <DataGrid disableRowSelectionOnClick columns={columns} pageSizeOptions={[]} rows={vehicleSpecs ?? []} />
      </Grid>
      <AddNewVehicleSpec
        open={openSpec}
        handleClose={handleAddSpec}
        specsData={specs ?? []}
        addedSpecs={vehicleSpecs ?? []}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        prefillData={prefillData}
      />
      <DeleteConfirmModal
        idToRemove={idToRemove}
        open={openDelete}
        setOpen={setOpenDelete}
        remove={removeSpec}
        routeToInvalidate='vehicle'
      />
    </>
  )
}

export default VehiclePreview
