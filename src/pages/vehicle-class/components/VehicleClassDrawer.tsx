import { Drawer } from '@mui/material'
import React, { SetStateAction } from 'react'
import HeaderWithClose from 'src/components/drawers/HeaderWithClose'
import VehicleClassForm from './VehicleClassForm'

interface Props {
  open: boolean
  setOpen: React.Dispatch<SetStateAction<boolean>>
}

const VehicleClassDrawer = ({ open, setOpen }: Props) => {
  const handleClose = () => setOpen(!open)

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
      <VehicleClassForm />
    </Drawer>
  )
}

export default VehicleClassDrawer
