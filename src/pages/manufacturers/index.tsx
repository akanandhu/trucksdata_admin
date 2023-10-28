import { Box, Card, CardHeader, Divider, Grid } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useState } from 'react'
import TableHeader from 'src/components/TableHeader'
import { manufacturersRows } from 'src/fake-data/rows'
import useGetManufacturersCols from './hooks/columns'
import ManufacturersDrawer from './components/ManufacturersDrawer'
import { useForm } from 'react-hook-form'
import { ManufacturersFields } from 'src/types/Manufacturers'
import { useRouter } from 'next/router'
import ManufacturerSearchHeader from './preview/components/ManufacturerSearchHeader'
import { useGetManufacturers } from 'src/api/services/manufacturers/get'

const Manufacturers = () => {
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
    reset
  } = useForm<ManufacturersFields>()

  const router = useRouter()

  const [openDrawer, setOpenDrawer] = useState(false)
  const handleAdd = () => {
    setOpenDrawer(true)
  }
  const [data, setData] = useState(manufacturersRows)
  
  // Apis
  const { data: manufacturers } = useGetManufacturers()  
  const addManufacturer = useAddManufacturer()
  const updateManufacturer = useEditManufacturer()

  const { columns } = useGetManufacturersCols({ handleEdit, handleView })

  function handleEdit() {
    console.log('')
  }

  function handleView(id: string) {
    router.push(`/manufacturers/preview/${id}`)
  }

  function onSubmit (values: ManufacturersFields) {
    console.log(values)
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
          <DataGrid disableRowSelectionOnClick columns={columns as any} rows={manufacturers?.data ?? []} />
        </Box>
      </Card>
      <ManufacturersDrawer handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors} open={openDrawer} setOpen={setOpenDrawer} control={control} />
    </Grid> 
  )
}
export default Manufacturers
