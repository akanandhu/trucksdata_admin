import { Box, Card, CardHeader, Divider, Grid } from '@mui/material'
import TableHeader from 'src/components/TableHeader'

import VehicleSearchHeader from './components/VehicleSearchHeader'
import { useRouter } from 'next/router'
import { DataGrid } from '@mui/x-data-grid'
import useGetVehicleColumns from './hooks/useGetVehicleColumns'
import { useGetVehicles } from 'src/api/services/vehicle/get'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { VehicleParamsTypes } from 'src/types/Vehicle'
import DeleteConfirmModal from 'src/components/modals/DeleteConfirmModal'
import { useRemoveVehicle } from 'src/api/services/vehicle/delete'
import FallbackSpinner from 'src/@core/components/spinner'

// import { useState } from "react"

const defaultValues = {
  title: ''
}

const Vehicle = () => {
  const router = useRouter()

  function handleAdd() {
    router.push('/vehicle/add/')
  }

  const [deleteId, setDeleteId] = useState<number>()
  const [open, setOpen] = useState(false)

  const remove = useRemoveVehicle()

  const columns = useGetVehicleColumns({
    handleDelete,
    handleEdit
  })

  function handleDelete(id: number) {
    setOpen(!open)
    setDeleteId(id)
  }

  function handleEdit (id: number) {
    router.push(`/vehicle/add?id=${id}`)
  }

  const { control, handleSubmit } = useForm({
    defaultValues
  })
  const [params, setParams] = useState<VehicleParamsTypes | null>({
    title: ''
  })

  function onSubmit(values: any) {
    setParams({
      ...values
    })
  }

  function onClear() {
    setParams(null)
  }

  const { data: vehicles, isLoading } = useGetVehicles(params)
  const vehicleData = vehicles?.data?.data

  if(isLoading) {
    return <FallbackSpinner />
  }

  return (
    <Grid>
      <Card>
        <CardHeader title='Vehicle' />
        <Divider />
        <VehicleSearchHeader control={control} handleSubmit={handleSubmit} onSubmit={onSubmit} onClear={onClear} />
        <Divider />

        <TableHeader title='Vehicle' handleNew={handleAdd} paddingX={16} />
        <Box sx={{ height: '100%' }}>
          <DataGrid disableRowSelectionOnClick columns={columns} rows={vehicleData ?? []} />
        </Box>
      </Card>
      <DeleteConfirmModal
        open={open}
        setOpen={setOpen}
        remove={remove}
        idToRemove={deleteId as any}
        routeToInvalidate='vehicles'
      />
    </Grid>
  )
}
export default Vehicle
