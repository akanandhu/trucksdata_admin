import { Box, Card, CardHeader, Divider, Grid } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useState } from 'react'
import TableHeader from 'src/components/TableHeader'
import useGetManufacturersCols from './hooks/columns'
import ManufacturersDrawer from './components/ManufacturersDrawer'
import { useForm } from 'react-hook-form'
import { ManufacturersFields } from 'src/types/Manufacturers'
import { useRouter } from 'next/router'
import { useGetManufacturers } from 'src/api/services/manufacturers/get'
import { useAddManufacturer } from 'src/api/services/manufacturers/post'
import { useQueryClient } from '@tanstack/react-query'
import useCustomToast from 'src/lib/toast'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import usePrefillManufacturer from './hooks/prefill'
import { useEditManufacturer } from 'src/api/services/manufacturers/patch'
import { useGetVehicleClasses } from 'src/api/services/vehicle-class/get'

const defaultValues = {
  name: '',
  vehicle_types: [],
  description: '',
  logo: '',
  faq: [],
  banners: ''
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required')
})

const Manufacturers = () => {
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
    reset
  } = useForm<ManufacturersFields>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  const router = useRouter()
  const queryClient: any = useQueryClient()

  const [openDrawer, setOpenDrawer] = useState(false)
  const [selectedData, setSelectedData] = useState<any>({})

  const handleAdd = () => {
    reset()
    setSelectedData(null)
    setOpenDrawer(true)
  }

  // Apis
  const isEdit = Boolean(selectedData?.name)
  const { data: manufacturers, isLoading } = useGetManufacturers()
  const { data: vehicle_types } = useGetVehicleClasses()

  const addManufacturer = useAddManufacturer()
  const editManufacturer = useEditManufacturer()

  const { columns } = useGetManufacturersCols({ handleEdit, handleView })
  const toast = useCustomToast()

  usePrefillManufacturer({
    selectedData,
    setValue
  })

  function handleEdit(manufacturer: any) {
    setSelectedData(manufacturer)
    setOpenDrawer(!openDrawer)
  }

  function handleView(id: string) {
    router.push(`/manufacturers/preview/${id}`)
  }

  function handleSuccess() {
    toast.success(`Manufacturer ${isEdit ? 'Updated' : 'Created'} Successfully`)
    queryClient.invalidateQueries(['manufacturer'])
    handleClose()
  }

  const mutationFn: any = isEdit ? editManufacturer : addManufacturer

  function onSubmit(values: ManufacturersFields) {
    const { name, description, vehicle_types: vehicleTypes, logo, banners, faq } = values
    const filteredObjects = vehicle_types?.data?.data?.filter((obj: { name: string }) =>
      vehicleTypes.includes(obj.name)
    )
    const data: any = {
      name,
      description,
      logo,
      banners,
      vehicle_types: filteredObjects?.map((type: { id: string }) => type?.id),
      faq
    }

    const queryData = isEdit ? { id: selectedData?.id, data } : data

    mutationFn.mutate(queryData, {
      onSuccess: handleSuccess
    })
  }

  const [refresh, setRefresh] = useState(0)
  function handleClose() {
    setOpenDrawer(!openDrawer)
    setSelectedData(null)
    reset({
      banners: '',
      logo: '',
      description: '',
      id: '',
      name: '',
      vehicle_types: []
    })
    mutationFn.reset()
    setRefresh(refresh => refresh + 1)
  }

  return (
    <Grid>
      <Card>
        <CardHeader title='Manufacturers' />
        <Divider />
        {/* <ManufacturerSearchHeader />
        <Divider /> */}

        <TableHeader title='Manufacturers' handleNew={handleAdd} paddingX={7.5} />
        <Box sx={{ height: '100%' }}>
          <DataGrid
            autoHeight
            pagination
            disableRowSelectionOnClick
            rows={manufacturers?.data?.data ? manufacturers?.data?.data : []}
            columns={columns}
            rowCount={manufacturers?.data?.total ? manufacturers?.data?.total : 0}
            loading={isLoading}
            paginationMode='server'
            pageSizeOptions={[]}
          />
        </Box>
      </Card>
      <ManufacturersDrawer
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        apiError={mutationFn?.error}
        open={openDrawer}
        setOpen={setOpenDrawer}
        control={control}
        reset={reset}
        handleClose={handleClose}
        vehicle_types={vehicle_types}
        key={`drawer_${refresh}`}
      />
    </Grid>
  )
}
export default Manufacturers
