import { Divider, Drawer, Grid } from '@mui/material'
import React, { SetStateAction, useEffect, useState } from 'react'
import HeaderWithClose from 'src/components/drawers/HeaderWithClose'
import AddNewVehicleSpecForm from '../AddNewVehicleSpecForm'
import { useFieldArray, useForm } from 'react-hook-form'
import { useAddNewSpecToVehicle, useAddNewSpecValueToVehicle } from 'src/api/services/vehicle/post'
import { useRouter } from 'next/router'
import useCustomToast from 'src/lib/toast'
import { useQueryClient } from '@tanstack/react-query'
import { useRemoveSpecValueFromVehicle } from 'src/api/services/vehicle/delete'
import { useGetVehicleSpecData } from 'src/api/services/vehicle/get'
import DeleteConfirmModal from 'src/components/modals/DeleteConfirmModal'

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

  const arrayFields = useFieldArray({
    name: 'values',
    control
  })

  const [refresh, setRefresh] = useState(0)

  const { data: prefillData, isFetched } = useGetVehicleSpecData(vehicleId, prefillId?.id)

  useEffect(() => {
    if (isFetched) {
      const specValues = prefillData?.values?.map((item: { value: string; child_values: any[] }) => {
        if (!item?.child_values?.length) {
          return { value: item?.value }
        } else {
          return { value: item?.child_values?.[0]?.value }
        }
      })
      setValue('specification_id', prefillData?.specification_id)
      setValue(`values`, specValues)
      setRefresh(refresh => refresh + 1)
    }
  }, [isFetched, prefillData, setRefresh, setValue])
  console.log(prefillData, 'specification')
  const addNewSpecValue = useAddNewSpecValueToVehicle()
  const addNewSpec = useAddNewSpecToVehicle()
  const removeSpecValue = useRemoveSpecValueFromVehicle(prefillData?.id)

  const mutateFn: any = isEdit ? addNewSpecValue : addNewSpec

  const toast = useCustomToast()

  function handleOnClose() {
    reset({})
    handleClose()
    setSelectedOption(null)
    setDeleteIds([])
  }

  function getParentId(itemValue: string, resultType: 'parentId' | 'parentName') {
    let parentId
    let parentName
    const key = resultType === 'parentId' ? selectedOption : selectedOption?.specification
    key?.options?.forEach((option: any) => {
      const resultObj = option?.child_options?.find((child: { option: string; parent_option_id: number }) => {
        return child?.option === itemValue
      })
      if (resultObj) {
        parentId = resultObj.parent_option_id
      }
      option.child_options?.forEach((child: { option: string }) => {
        if (child?.option === itemValue) {
          parentName = option?.option
        }
      })
    })

    return resultType === 'parentId' ? parentId : parentName
  }

  function onSubmit(data: any) {
    const isNested = selectedOption?.specification?.data_type === 'nested_drop_down'
    const { specification_id, values } = data || {}
    const specValues = prefillData?.values || []
    const specLength = specValues?.length
    const newlyAddedValues = values?.slice(specLength)

    const mapItem = isEdit ? newlyAddedValues : [1]

    mapItem?.map((item: { value: string }) => {
      const parentId = getParentId(item.value, 'parentId')
      const dataToSend = {
        specification_id,
        value: item.value,
        parent_value_id: isNested ? parentId : null
      }

      const dataToAdd = {
        specification_id,
        spec_type: selectedOption?.specification?.data_type,
        is_key_feature: false,
        values: values?.map((item: { value: string }) => {
          const isParent = selectedOption?.specification?.options?.find(
            (option: { option: string }) => option?.option === item?.value
          )
          const isChild = !isParent && isNested
          if (isChild) {
            const parentValue = getParentId(item.value, 'parentName')

            return {
              value: parentValue,
              child_values: [
                {
                  value: item.value
                }
              ]
            }
          } else {
            return {
              value: item.value
            }
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
    handleOnClose()
    queryClient.invalidateQueries({ queryKey: ['vehicle'] })
    toast.success(`Specification ${isEdit ? 'updated' : 'added'} to vehicle`)
  }

  const [deleteIds, setDeleteIds] = useState<any>([])
  const [openDelete, setOpenDelete] = useState(false)
  const [indexToDelete, setIndexToDelete] = useState<any>('')

  function handleRemove(obj: any, index: number) {
    if (isEdit) {
      const addedSpecsLength = prefillData?.values?.length || 0
      if (addedSpecsLength < index) {
        arrayFields.remove(indexToDelete)
      } else {
        const idToDelete = prefillData?.values?.[index]?.id
        setOpenDelete(!openDelete)
        setDeleteIds(idToDelete)
        setIndexToDelete(index)
      }
    } else {
      arrayFields.remove(index)
    }
  }
  function handleDeleteSuccess() {
    arrayFields.remove(indexToDelete)
    queryClient.invalidateQueries({ queryKey: ['vehicle'] })
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
            arrayFields={arrayFields}
          />
        </Grid>
      </form>
      <DeleteConfirmModal
        idToRemove={deleteIds}
        open={openDelete}
        setOpen={setOpenDelete}
        remove={removeSpecValue}
        routeToInvalidate='vehicle-spec-data'
        handleOnSuccess={handleDeleteSuccess}
      />
    </Drawer>
  )
}

export default AddNewVehicleSpec
