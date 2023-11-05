import { Drawer } from '@mui/material'
import React from 'react'
import HeaderWithClose from 'src/components/drawers/HeaderWithClose'
import { Datum } from 'src/types/EnergySources'
import VehicleClassSpecsForm from './VehicleClassSpecsForm'
import { FieldError, UseFormHandleSubmit } from 'react-hook-form'
import { VehicleClassSpecTypes } from 'src/types/VehicleClass'

interface AddProps {
  open: boolean
  handleClose: () => void
  energySources: Datum[]
  handleSubmit: UseFormHandleSubmit<any>
  onSubmit: (data: VehicleClassSpecTypes) => void
  error: Partial<FieldError>
  isLoading: boolean
  apiError: any
  control: any
  specs: any
  ref: any
}

const AddVehicleClassSpecs = (props: AddProps) => {
  const { open, handleClose, energySources, handleSubmit, onSubmit, ref, error, isLoading, apiError, control, specs } = props

  const specProps = {
    energySources,
    handleSubmit,
    onSubmit,
    error,
    isLoading,
    handleClose,
    apiError,
    control,
    specs,
    ref
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
      <VehicleClassSpecsForm {...specProps} />
    </Drawer>
  )
}

export default AddVehicleClassSpecs
