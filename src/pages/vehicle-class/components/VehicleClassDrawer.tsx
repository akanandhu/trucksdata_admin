import { Drawer } from '@mui/material'
import React, { SetStateAction } from 'react'
import HeaderWithClose from 'src/components/drawers/HeaderWithClose'
import VehicleClassForm from './VehicleClassForm'
import { Control, FieldErrors } from 'react-hook-form'
import { VehicleClassFields } from 'src/types/VehicleClass'

interface Props {
  open: boolean
  setOpen: React.Dispatch<SetStateAction<boolean>>
  control: Control<VehicleClassFields>
  errors: FieldErrors
  setSelectedData: React.Dispatch<SetStateAction<VehicleClassFields>>
}

const VehicleClassDrawer = ({ open, setOpen, control, errors, setSelectedData }: Props) => {
  const handleClose = () => {
    setOpen(!open)
    setSelectedData({
      id: '',
      status: 'active',
      title: ''
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
      <VehicleClassForm control={control} errors={errors} handleClose={handleClose} />
    </Drawer>
  )
}

export default VehicleClassDrawer
