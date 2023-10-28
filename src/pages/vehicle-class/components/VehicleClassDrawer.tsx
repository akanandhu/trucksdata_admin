import { Drawer } from '@mui/material'
import React, { SetStateAction } from 'react'
import HeaderWithClose from 'src/components/drawers/HeaderWithClose'
import VehicleClassForm from './VehicleClassForm'
import { Control, FieldErrors, UseFormHandleSubmit } from 'react-hook-form'
import { VehicleClassFields } from 'src/types/VehicleClass'

interface Props {
  open: boolean
  setOpen: React.Dispatch<SetStateAction<boolean>>
  control: Control<VehicleClassFields>
  errors: FieldErrors
  setSelectedData: React.Dispatch<SetStateAction<VehicleClassFields>>
  handleSubmit: UseFormHandleSubmit<VehicleClassFields>
  onSubmit: (values: VehicleClassFields) => void
  apiError: any
}

const VehicleClassDrawer = ({ open, setOpen, control, errors, setSelectedData, handleSubmit, onSubmit, apiError }: Props) => {
  const handleClose = () => {
    setOpen(!open)
    setSelectedData({
      id: '',
      status: 'active',
      title: '',
      name: ''
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
      <HeaderWithClose title='Add Vehicle Class' handleClose={handleClose} />
      <VehicleClassForm control={control} apiError={apiError} errors={errors} handleClose={handleClose} handleSubmit={handleSubmit} onSubmit={onSubmit} />
    </Drawer>
  )
}

export default VehicleClassDrawer
