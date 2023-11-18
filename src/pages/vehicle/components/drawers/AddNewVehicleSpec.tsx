import { Divider, Drawer, Grid } from '@mui/material'
import React, { SetStateAction, useEffect } from 'react'
import HeaderWithClose from 'src/components/drawers/HeaderWithClose'
import AddNewVehicleSpecForm from '../AddNewVehicleSpecForm'
import { useForm } from 'react-hook-form'
import { useAddNewSpecToVehicle } from 'src/api/services/vehicle/post'
import { useRouter } from 'next/router'
import useCustomToast from 'src/lib/toast'
import { useQueryClient } from '@tanstack/react-query'
import { useUpdateSpecToVehicle } from 'src/api/services/vehicle/patch'

const defaultValues = {
  specification_id: ''
}

const AddNewVehicleSpec = ({
  open,
  handleClose,
  specsData,
  addedSpecs,
  selectedOption,
  setSelectedOption,
  prefillData
}: {
  open: boolean
  handleClose: () => void
  specsData: any
  addedSpecs: any
  selectedOption: any
  setSelectedOption: React.Dispatch<SetStateAction<any>>
  prefillData: any
}) => {
  const isEdit = Boolean(prefillData)

  const specs = !isEdit
    ? specsData?.filter(
        (obj: { specification_id: number }) =>
          !addedSpecs?.some((item: { specification_id: number }) => item.specification_id === obj.specification_id)
      )
    : specsData

  const { control, reset, handleSubmit, setValue } = useForm<any>({
    defaultValues
  })

  useEffect(() => {
    const specValues = prefillData?.values?.map((item: { value: string }) => {
      return item?.value
    })

    setValue('specification_id', prefillData?.specification_id)
    setValue(`${prefillData?.specification?.name}`, specValues)
  }, [prefillData, setValue])

  const addNewSpec = useAddNewSpecToVehicle()
  const updateSpec = useUpdateSpecToVehicle()

  const mutateFn: any = isEdit ? updateSpec : addNewSpec

  const router = useRouter()
  const toast = useCustomToast()

  function handleOnClose() {
    reset({})
    handleClose()
    setSelectedOption(null)
  }

  const vehicle_id = router?.query?.id

  function onSubmit(values: any) {
    const spec_type = selectedOption?.specification?.data_type
    const specName = prefillData?.specification?.name

    const { specification_id, ...rest } = values || {}
    const vehicleId = Number(vehicle_id)
    const valuesCollection = !isEdit
      ? Object.keys(rest)?.map((key: any) => {
          const dataValue = Array.isArray(values[key]) ? values[key] : [values[key]]

          return {
            values: Array.isArray(dataValue)
              ? dataValue?.map((item: any) => ({
                  value: item
                }))
              : null
          }
        })
      : rest[specName]?.map((item: any) => ({
          value: item
        }))

    const data = {
      specification_id,
      spec_type,
      is_key_feature: false,
      ...valuesCollection?.[0]
    }

    const dataToEdit = {
      _method: 'put',
      value: valuesCollection
    }

    const mutateData: any = isEdit
      ? { id: vehicle_id, spec_id: specification_id, data: dataToEdit }
      : { values: data, vehicle_id: vehicleId }

    mutateFn.mutate(mutateData, {
      onSuccess: () => handleSuccess()
    })
  }

  const queryClient = useQueryClient()

  function handleSuccess() {
    handleOnClose()
    queryClient.invalidateQueries({ queryKey: ['vehicle'] })
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
            isEdit={isEdit}
          />
        </Grid>
      </form>
    </Drawer>
  )
}

export default AddNewVehicleSpec
