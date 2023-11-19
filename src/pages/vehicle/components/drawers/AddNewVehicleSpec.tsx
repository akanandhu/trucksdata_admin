import { Divider, Drawer, Grid } from '@mui/material'
import React, { SetStateAction, useEffect, useState } from 'react'
import HeaderWithClose from 'src/components/drawers/HeaderWithClose'
import AddNewVehicleSpecForm from '../AddNewVehicleSpecForm'
import { useForm } from 'react-hook-form'
import { useAddNewSpecToVehicle, useAddNewSpecValueToVehicle } from 'src/api/services/vehicle/post'
import { useRouter } from 'next/router'
import useCustomToast from 'src/lib/toast'
import { useQueryClient } from '@tanstack/react-query'
import { useRemoveSpecValueFromVehicle } from 'src/api/services/vehicle/delete'
import { useGetVehicleSpecData } from 'src/api/services/vehicle/get'

const defaultValues = {
  specification_id: '',
  values: [
    {
      value: ''
    }
  ]
}

const AddNewVehicleSpec = ({
  open,
  handleClose,
  specsData,
  addedSpecs,
  selectedOption,
  setSelectedOption,
  prefillId
}: {
  open: boolean
  handleClose: () => void
  specsData: any
  addedSpecs: any
  selectedOption: any
  setSelectedOption: React.Dispatch<SetStateAction<any>>
  prefillId: any
}) => {
  const isEdit = Boolean(prefillId)

  const router = useRouter()
  const vehicleId = router?.query?.id as string

  const specs = !isEdit
    ? specsData?.filter(
        (obj: { specification_id: number }) =>
          !addedSpecs?.some((item: { specification_id: number }) => item.specification_id === obj.specification_id)
      )
    : specsData

  const { control, reset, handleSubmit, setValue } = useForm<any>({
    defaultValues
  })

  const [refresh, setRefresh] = useState(0)

  const { data: prefillData, isFetched } = useGetVehicleSpecData(vehicleId, prefillId?.id)

  useEffect(() => {
    if (isFetched) {
      const specValues = prefillData?.values?.map((item: { value: string }) => {
        return { value: item?.value }
      })
      console.log(prefillData, 'prefillData')
      setValue('specification_id', prefillData?.specification_id)
      setValue(`values`, specValues)
      setRefresh(refresh => refresh + 1)
    }
  }, [isFetched, prefillData, setRefresh, setValue])

  const addNewSpecValue = useAddNewSpecValueToVehicle()
  const addNewSpec = useAddNewSpecToVehicle()
  const removeSpecValue = useRemoveSpecValueFromVehicle(prefillData?.specification_id)

  const mutateFn: any = isEdit ? addNewSpecValue : addNewSpec

  const toast = useCustomToast()

  function handleOnClose() {
    reset({})
    handleClose()
    setSelectedOption(null)
    setDeleteIds([])
  }

  function onSubmit(data: any) {
    const { specification_id, values } = data || {}

    const specValues = prefillData?.values || []

    const newlyAddedValues = [...specValues, ...values].filter(item => {
      return !(
        specValues.some((model: { value: string }) => model.value === item.value) &&
        values.some((model: { value: string }) => model.value === item.value)
      )
    })
    
    const mapItem = isEdit ? newlyAddedValues : [1]

    mapItem?.map((item: { value: string }) => {
      const dataToSend = {
        specification_id,
        value: item.value,
        parent_value_id: null
      }

      const dataToAdd = {
        specification_id,
        spec_type: selectedOption?.specification?.data_type,
        is_key_feature: false,
        values: values?.map((item: { value: string }) => {
          return {
            value: item.value
          }
        })
      }

      const dataToMutate = isEdit
        ? { values: dataToSend, spec_id: prefillData?.id }
        : { values: dataToAdd, vehicle_id: vehicleId }
      mutateFn.mutate(dataToMutate, {
        onSuccess: () => handleSuccess()
      })
    })
  }

  const queryClient = useQueryClient()

  function handleSuccess() {
    // delete options if any first
    deleteIds?.map((id: number) => {
      removeSpecValue.mutate({
        id
      })
    })
    handleOnClose()
    queryClient.invalidateQueries({ queryKey: ['vehicle'] })
    toast.success(`Specification added to vehicle`)
  }

  const [deleteIds, setDeleteIds] = useState<any>([])

  function handleRemove(obj: any) {
    if (isEdit) {
      const objValue = obj.value
      const addedValues = prefillData?.values || []
      const idToDelete = addedValues?.find((item: { value: string }) => item.value === objValue)?.id
      setDeleteIds((prevId: string[]) => [...prevId, idToDelete])
    }
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
        <Grid key={`refresh${refresh}`} container spacing={5} padding={4}>
          <AddNewVehicleSpecForm
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            handleClose={handleOnClose}
            control={control}
            specs={specs ?? []}
            isEdit={isEdit}
            handleRemove={handleRemove}
          />
        </Grid>
      </form>
    </Drawer>
  )
}

export default AddNewVehicleSpec
