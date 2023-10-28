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
    fileLink: string[]
    setFileLink: React.Dispatch<SetStateAction<string[]>>
    reset: any
    apiError: any
}

const ManufacturersDrawer = ({open, setOpen, control, errors, onSubmit, handleSubmit, apiError, fileLink, setFileLink, reset}:Props) => {
    const handleClose = () => {
        setOpen(!open)
        setFileLink([''])
        reset()
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
      <ManufacturersForm fileLink={fileLink} setFileLink={setFileLink} handleSubmit={handleSubmit} apiError={apiError} onSubmit={onSubmit} control={control} errors={errors} handleClose={handleClose}   />
    </Drawer> 
  )
}

export default ManufacturersDrawer