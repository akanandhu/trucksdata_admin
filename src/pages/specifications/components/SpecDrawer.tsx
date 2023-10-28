import { Drawer } from '@mui/material'
import React, { SetStateAction } from 'react'
import HeaderWithClose from 'src/components/drawers/HeaderWithClose'
import { Control, FieldErrors, UseFormHandleSubmit } from 'react-hook-form'
import { FieldDataTypes, SpecFields } from 'src/types/SpecFields'
import SpecForm from './SpecForm'

interface Props {
  open: boolean
  setOpen: React.Dispatch<SetStateAction<boolean>>
  control: Control<SpecFields>
  errors: FieldErrors
  setSelectedData: React.Dispatch<SetStateAction<SpecFields>>
  handleSubmit: UseFormHandleSubmit<SpecFields>
  onSubmit: (values: SpecFields) => void
  apiError: any
  options: any
  data_type: FieldDataTypes
}

const SpecDrawer = ({
  open,
  setOpen,
  control,
  errors,
  setSelectedData,
  handleSubmit,
  onSubmit,
  apiError,
  options,
  data_type
}: Props) => {
  const handleClose = () => {
    setOpen(!open)
    setSelectedData({
      data_type: 'text',
      name: '',
      options: null,
      specification_category_id: ''
    })
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <HeaderWithClose title='Add Specifications' handleClose={handleClose} />
      <SpecForm
        control={control}
        apiError={apiError}
        errors={errors}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        options={options}
        data_type={data_type}
      />
    </Drawer>
  )
}

export default SpecDrawer
