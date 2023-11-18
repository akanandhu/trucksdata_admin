import { Divider, Drawer, Grid } from '@mui/material'
import React, { useState } from 'react'
import HeaderWithClose from 'src/components/drawers/HeaderWithClose'
import AddNewVehicleSpecForm from '../AddNewVehicleSpecForm'
import { useForm } from 'react-hook-form'
import { useAddNewSpecToVehicle } from 'src/api/services/vehicle/post'
import { useRouter } from 'next/router'
import useCustomToast from 'src/lib/toast'
import { useQueryClient } from '@tanstack/react-query'

const defaultValues = {
  specification_id: ''
}

const AddNewVehicleSpec = ({
  open,
  handleClose,
  specsData,
  addedSpecs
}: {
  open: boolean
  handleClose: () => void
  specsData: any
  addedSpecs: any
}) => {
  const specs = specsData?.filter(
    (obj: { specification_id: number }) =>
      !addedSpecs?.some((item: { specification_id: number }) => item.specification_id === obj.specification_id)
  )

  const { control, reset, handleSubmit } = useForm({
    defaultValues
  })

 

  const addNewSpec = useAddNewSpecToVehicle()

  const router = useRouter()
  const toast = useCustomToast()
  const [selectedOption, setSelectedOption] = useState<any>({})

  function handleOnClose() {
    reset({})
    handleClose()
    setSelectedOption(null)
  }

  const vehicle_id = router?.query?.id

  function onSubmit(values: any) {
    const spec_type = selectedOption?.specification?.data_type
    const { specification_id, ...rest } = values || {}
    const vehicleId = Number(vehicle_id)
    const valuesCollection = Object.keys(rest)?.map((key: any) => { 
      const dataValue = Array.isArray(values[key]) ? values[key] : [values[key]]
    
    return ({
      values:
         Array.isArray(dataValue)
          ? dataValue?.map((item: any) => ({
              value: item
            }))
          : null
    })})
    
    const data = {
      specification_id,
      spec_type,
      is_key_feature: false,
      ...valuesCollection?.[0]
    }
    addNewSpec.mutate(
      { values: data, vehicle_id: vehicleId },
      {
        onSuccess: () => handleSuccess()
      }
    )
  }

  const queryClient = useQueryClient()

  function handleSuccess() {
    handleOnClose()
    queryClient.invalidateQueries({queryKey: ['vehicle']})
    toast.success(`Specification added to vehicle`)
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleOnClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <HeaderWithClose title='Add More Specifications' handleClose={handleClose} />
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5} padding={4}>
          <AddNewVehicleSpecForm
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            handleClose={handleOnClose}
            control={control}
            specs={specs ?? []}
          />
        </Grid>
      </form>
    </Drawer>
  )
}

export default AddNewVehicleSpec
