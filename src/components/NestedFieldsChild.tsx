import React, { useState } from 'react'
import TextFormField from './input-fields/TextFormField'
import { useFieldArray } from 'react-hook-form'
import { Grid, IconButton, Tooltip } from '@mui/material'
import { GridAddIcon, GridCloseIcon } from '@mui/x-data-grid'
import DeleteConfirmModal from './modals/DeleteConfirmModal'
import { useDeleteSpecOpts } from 'src/api/services/specifications/options/delete'
import { axiosInstance } from 'src/axios/axiosInstance'

const NestedFieldsChild = ({ nestIndex, control }: { nestIndex: number; control: any }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `options.${nestIndex}.child_options`
  })

  const [open, setOpen] = useState(false)
  const [idToRemove, setIdToRemove] = useState()
  const [idToRemoveField, setIdToRemoveField] = useState<number | string>()


  function removeChildren(index: number, item: any) {
    if(item?.specification_id) {
      axiosInstance.get(`specifications/${item?.specification_id}`).then(res => {
        const childOptions = res?.data?.options?.map((obj: { child_options: any[] }) => obj.child_options)?.flat()
        const selectedOpt = childOptions?.find((opt: { option: string }) => opt?.option === item?.option)
        setOpen(!open)
        setIdToRemove(selectedOpt?.id)
        setIdToRemoveField(index)
      })
    }
    else {
    remove(index)
    }
  }

  function handleOnSuccess() {
    remove(idToRemoveField as any)
  }

  const removeOpt = useDeleteSpecOpts()

  return (
    <>
      <Grid mt={1}>
        {fields.map((item, index) => (
          <Grid display={'flex'} gap={3} marginTop={3} key={item.id}>
            <TextFormField control={control} id={`options[${nestIndex}].child_options[${index}].option`} />
            <IconButton onClick={() => removeChildren(index, item)} color='secondary'>
              <GridCloseIcon color='error' />
            </IconButton>
          </Grid>
        ))}
        <Tooltip title='Add Child'>
          <IconButton
            onClick={() =>
              append({
                option: ''
              })
            }
            color='secondary'
            sx={{ marginY: 1 }}
          >
            <GridAddIcon color='success' />
          </IconButton>
        </Tooltip>
      </Grid>
      <DeleteConfirmModal
        idToRemove={idToRemove as any}
        open={open}
        remove={removeOpt}
        routeToInvalidate='specifications'
        setOpen={setOpen}
        handleOnSuccess={handleOnSuccess}
      />
    </>
  )
}

export default NestedFieldsChild
