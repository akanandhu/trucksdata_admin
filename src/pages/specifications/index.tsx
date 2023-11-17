import { Box, Card, CardHeader, Divider, Grid } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import DeleteConfirmModal from 'src/components/modals/DeleteConfirmModal'
import { useState } from 'react'
import TableHeader from '../../components/TableHeader'
import { useFieldArray, useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import useCustomToast from 'src/lib/toast'
import { SpecFields } from 'src/types/SpecFields'
import useGetSpecCols from './hooks/columns'
import { useGetSpecsData } from 'src/api/services/specifications/get'
import SpecDrawer from './components/SpecDrawer'
import { useAddSpecification } from 'src/api/services/specifications/post'
import { useEditSpecification } from 'src/api/services/specifications/patch'
import usePrefillSpec from './hooks/prefill'
import { useDeleteSpec } from 'src/api/services/specifications/delete'
import { useDeleteSpecOpts } from 'src/api/services/specifications/options/delete'
import { useAddSpecOption } from 'src/api/services/specifications/options/post'
import FallbackSpinner from 'src/@core/components/spinner'

const defaultValues: SpecFields = {
  name: '',
  data_type: 'text',
  options: null,
  specification_category_id: '',
}

const Specifications = () => {
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [idToRemove, setIdToRemove] = useState('')
  const [selectedData, setSelectedData] = useState<SpecFields>({
    name: '',
    data_type: 'text',
    options: null,
    specification_category_id: '',
  })
  const [openDrawer, setOpenDrawer] = useState(false)
  const [deleteIds, setDeleteIds] = useState<any>([])

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<SpecFields>({
    defaultValues
  })

  const [data_type] = watch(['data_type'])

  const options = useFieldArray({
    control,
    name: 'options'
  })

 

  const isEdit = selectedData?.name !== ''
  const queryClient = useQueryClient()
  const toast = useCustomToast()
  const addSpec = useAddSpecification()
  const editSpec = useEditSpecification()
  const addSpecOption = useAddSpecOption()
  const deleteSpecOpt = useDeleteSpecOpts()
  const mutationFn: any = isEdit ? editSpec : addSpec

  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer)
  }
  const handleDelete = (id: string) => {
    setIdToRemove(id)
    setDeleteConfirm(true)
  }
  const handleEdit = (params: SpecFields) => {
    handleOpenDrawer()
    setSelectedData(params)
  }
  const handleAdd = () => {
    setSelectedData(defaultValues)
    handleOpenDrawer()
  }

  function handleClose() {
    handleOpenDrawer()
    setSelectedData({
      data_type: 'text',
      name: '',
      options: null,
      specification_category_id: '',
    })
    mutationFn.reset()
    setDeleteIds([])
  }

  const deleteSpec = useDeleteSpec()
  const { columns } = useGetSpecCols({ handleDelete, handleEdit })
  usePrefillSpec({ selectedData, setValue })

  const { data: specs, isLoading } = useGetSpecsData()
  const { data: specsData } = specs?.data || {}

  function handleSuccess(options: any) {
    if (deleteIds?.length) {
      deleteIds?.map((id: string) => {
        return deleteSpecOpt?.mutate(
          { id },
          {
            onSuccess: handleDeleteSuccess
          }
        )
      })
    } else {
      handleDeleteSuccess()
    }
    console.log(options,'optionCheck')
    const specId = options?.[0]?.specification_id
    const specsOption = specsData?.filter((spec: { id: string }) => spec?.id === specId)
    const specOptionCollection = specsOption?.[0]?.options
    if (selectedData) {
      if (options?.length) {
        if (options?.length !== specOptionCollection?.length) {
          const nonAddedSpecs = options.filter(
            (obj1: { id: string; name: string }) =>
              !specOptionCollection?.some(
                (obj2: { id: string; name: string }) => obj1.id === obj2.id && obj1.name === obj2.name
              )
          )
          if(nonAddedSpecs?.length) {
            const dataToAdd = {
              specification_id: specId,
              options: nonAddedSpecs
            }
            addSpecOption.mutate(dataToAdd, {
              onSuccess: () => handleDeleteSuccess()
            })
          }
        }
      }
    }

    handleClose()
    toast.success(`Successfully ${isEdit ? 'Updated' : 'Created'}`)
    reset()
  }

  function handleDeleteSuccess() {
    queryClient.invalidateQueries({ queryKey: ['specifications'] })
  }

  function onSubmit(values: SpecFields) {
    
    const { name, data_type, options, specification_category_id } = values
    const specData = {
      name,
      data_type,
      specification_category_id,
      ...((data_type === 'drop_down' || data_type === 'nested_drop_down')  && { options: options })
    }
    const queryParams: any = isEdit ? { data: specData, id: selectedData?.id } : { ...specData }
    mutationFn.mutate(queryParams, {
      onSuccess: () => handleSuccess(options)
    })
  }
  function handleDeleteOption(option: any) {
    const specId = option.specification_id
    const selectedSpec = specsData?.filter((spec: { id: string }) => spec?.id === specId)
    const selectedOptions = selectedSpec?.[0]?.options
    const selectedName = option?.option
    const selectedCollectionToDelete = selectedOptions?.filter((option: any) => option?.option === selectedName)
    const selectedIdToDelete = selectedCollectionToDelete?.[0]?.id
    setDeleteIds((prevId: string[]) => [...prevId, selectedIdToDelete])
  }

  if(isLoading) {
    return <FallbackSpinner />
  }

  return (
    <Grid>
      <Card>
        <CardHeader title='Specifications' />
        <Divider />
        <TableHeader title='Specifications' handleNew={handleAdd} />
        <Box sx={{ height: '100%' }}>
          <DataGrid disableRowSelectionOnClick loading={isLoading} columns={columns as any} rows={specsData ?? []} />
        </Box>
      </Card>
      <SpecDrawer
        open={openDrawer}
        setOpen={setOpenDrawer}
        control={control}
        errors={errors}
        apiError={mutationFn?.error}
        setSelectedData={setSelectedData}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        options={options}
        data_type={data_type}
        handleClose={handleClose}
        mutationLoading={editSpec.isPending || addSpec.isPending}
        handleDeleteOption={handleDeleteOption}
      />

      <DeleteConfirmModal
        open={deleteConfirm}
        setOpen={setDeleteConfirm}
        remove={deleteSpec}
        idToRemove={idToRemove}
        routeToInvalidate='specifications'
      />
    </Grid>
  )
}
export default Specifications
