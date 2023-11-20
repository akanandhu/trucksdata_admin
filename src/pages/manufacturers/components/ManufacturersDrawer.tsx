import { Drawer } from '@mui/material'
import React, { SetStateAction } from 'react'
import { Control, FieldErrors, UseFormHandleSubmit } from 'react-hook-form'
import HeaderWithClose from 'src/components/drawers/HeaderWithClose'
import ManufacturersForm from './ManufacturersForm'
import { ManufacturersFields } from 'src/types/Manufacturers'

interface Props {
  open: boolean
  setOpen: React.Dispatch<SetStateAction<boolean>>
  control: Control<ManufacturersFields>
  handleSubmit: UseFormHandleSubmit<ManufacturersFields>
  onSubmit: (values: ManufacturersFields) => void
  errors: FieldErrors

  reset: any
  apiError: any
  handleClose: () => void
  vehicle_types: any

}

const ManufacturersDrawer = ({
  open,
  handleClose,
  control,
  errors,
  onSubmit,
  handleSubmit,
  apiError,
  vehicle_types,

}: Props) => {
  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 500 } } }}
    >
      <HeaderWithClose title='Add Manufacturer' handleClose={handleClose} />
      <ManufacturersForm
        vehicle_types={vehicle_types}
        handleSubmit={handleSubmit}
        apiError={apiError}
        onSubmit={onSubmit}
        control={control}
        errors={errors}
        handleClose={handleClose}
      />
    </Drawer>
  )
}

export default ManufacturersDrawer
