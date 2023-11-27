import { Drawer } from '@mui/material'
import React from 'react'
import HeaderWithClose from 'src/components/drawers/HeaderWithClose'
import BrandModel from './BrandModel'

const AddModelDrawer = ({
  open,
  vehicle_classes,
  control,
  handleSubmit,
  onSubmit,
  handleClose,
  errors
}: {
  open: boolean
  vehicle_classes: any
  control: any
  handleSubmit: any
  onSubmit: (values: any) => void
  handleClose: () => void
  errors: any
}) => {

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <HeaderWithClose title='Add Model' handleClose={handleClose} />
      <BrandModel handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors} control={control} vehicle_classes={vehicle_classes} handleClose={handleClose} />
    </Drawer>
  )
}

export default AddModelDrawer
