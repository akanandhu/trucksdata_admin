import { Drawer } from '@mui/material'
import React, { SetStateAction } from 'react'
import { Control, FieldErrors } from 'react-hook-form'
import HeaderWithClose from 'src/components/drawers/HeaderWithClose'
import ManufacturersForm from './ManufacturersForm'
import { ManufacturersFields } from 'src/types/Manufacturers'

interface Props {
    open: boolean
    setOpen: React.Dispatch<SetStateAction<boolean>>
    control: Control<ManufacturersFields>
    errors: FieldErrors
}

const ManufacturersDrawer = ({open, setOpen, control, errors}:Props) => {
    const handleClose = () => {
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
      <HeaderWithClose title='Add Manufacturer' handleClose={handleClose} />
      <ManufacturersForm control={control} errors={errors} handleClose={handleClose}   />
    </Drawer>
  )
}

export default ManufacturersDrawer