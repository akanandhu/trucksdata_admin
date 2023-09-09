import { Drawer } from '@mui/material'
import React, { SetStateAction } from 'react'
import Header from 'src/components/Header';
import HeaderWithClose from 'src/components/drawers/HeaderWithClose';
import BrandModel from './BrandModel';

const AddModelDrawer = ({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<SetStateAction<boolean>> }) => {
  function handleClose() {
    setOpen(!open)
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
        <HeaderWithClose title='Add Model' handleClose={handleClose} />
        <BrandModel handleClose={handleClose} />
    </Drawer>
  )
}

export default AddModelDrawer
