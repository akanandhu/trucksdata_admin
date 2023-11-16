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

// import { useState } from "react"


const defaultValues = {
  title: ''
}

const Vehicle = () => {
  const router = useRouter()

  function handleAdd() {
    router.push('/vehicle/add/')
  }

  const columns = useGetVehicleColumns()

  // const [deleteConfirm, setDeleteConfirm] = useState(false)

  const { control, handleSubmit } = useForm({
    defaultValues
  })
  const [params, setParams] = useState<VehicleParamsTypes | null>({
    title: ''
  })
  console.log(params, 'paramsCheck')
  function onSubmit(values: any) {
    setParams({
      ...values
    })
  }

  function onClear () {
    setParams(null)
  }

  const { data: vehicles } = useGetVehicles(params)
  const vehicleData = vehicles?.data?.data

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
      {/* <DeleteConfirmModal
          open={deleteConfirm}
          setOpen={setDeleteConfirm}
          remove={vehicles}
          idToRemove={idToRemove}
          setRemoved={setData}
        /> */}
    </Grid>
  )
}
export default Vehicle
