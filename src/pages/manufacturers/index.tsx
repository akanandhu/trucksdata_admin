import { Box, Card, CardHeader, Divider, Grid } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import TableHeader from 'src/components/TableHeader'
import useGetManufacturersCols from './hooks/columns'
import ManufacturersDrawer from './components/ManufacturersDrawer'
import { useForm } from 'react-hook-form'
import { ManufacturersFields } from 'src/types/Manufacturers'
import { useRouter } from 'next/router'
import ManufacturerSearchHeader from './preview/components/ManufacturerSearchHeader'
import { useGetManufacturers } from 'src/api/services/manufacturers/get'
import { useAddManufacturer } from 'src/api/services/manufacturers/post'
import { useQueryClient } from '@tanstack/react-query'
import useCustomToast from 'src/lib/toast'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const defaultValues = {
  name: '',
  vehicle_types: [],
  description: ''
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
  const queryClient:any = useQueryClient()

  const [openDrawer, setOpenDrawer] = useState(false)
  const [selectedData, setSelectedData] = useState<any>({})
  const [fileLink,setFileLink] = useState<string[]>([])
  const handleAdd = () => {
    reset()
    setSelectedData(null)
    setOpenDrawer(true)
  }

  // Apis
  const { data: manufacturers } = useGetManufacturers()
  const addManufacturer = useAddManufacturer()

  // const updateManufacturer = useEditManufacturer()
  const { columns } = useGetManufacturersCols({ handleEdit, handleView })
  const toast = useCustomToast()

  useEffect(() => {
    if(selectedData?.name) {
        reset({
          description: selectedData?.description,
          name: selectedData?.name
        })
    } else {
      reset()
    }
  }, [reset, selectedData, setValue])

  function handleEdit(manufacturer: any) {
    setSelectedData(manufacturer)
    setOpenDrawer(!openDrawer)
  }

  function handleView(id: string) {
    router.push(`/manufacturers/preview/${id}`)
  }

  function handleSuccess() {
    toast.success(`Manufacturer Created Successfully`)
    queryClient.invalidateQueries(['manufacturer'])
    setOpenDrawer(!openDrawer)
    reset()
  }

  const mutationFn = addManufacturer

  function onSubmit(values: ManufacturersFields) {
    const { name, description, vehicle_types } = values
    const data:any = {
      name,
      description,
      logo: fileLink?.[0],
      vehicle_types: vehicle_types?.map(type => {
        return {
          vehicle_type_id: type?.id
        }
      })
    }

    mutationFn.mutate(data, {
      onSuccess: handleSuccess
    })
  }

  return (
    <Grid>
      <Card>
        <CardHeader title='Manufacturers' />
        <Divider />
        <ManufacturerSearchHeader />
        <Divider />

        <TableHeader title='Manufacturers' handleNew={handleAdd} paddingX={7.5} />
        <Box sx={{ height: '100%' }}>
          <DataGrid disableRowSelectionOnClick columns={columns as any} rows={manufacturers?.data?.data ?? []} />
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
        fileLink={fileLink}
        setFileLink={setFileLink}
        reset={reset}
      />
    </Grid>
  )
}
export default Manufacturers
