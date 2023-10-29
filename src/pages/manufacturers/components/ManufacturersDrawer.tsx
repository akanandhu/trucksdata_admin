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
  handleClose: () => void
  vehicle_types: any
  files: any
  setFiles: React.Dispatch<SetStateAction<any>>
}

const ManufacturersDrawer = ({
  open,
  handleClose,
  control,
  errors,
  onSubmit,
  handleSubmit,
  apiError,
  fileLink,
  setFileLink,
  vehicle_types,
  files,
  setFiles
}: Props) => {
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
      <ManufacturersForm
        vehicle_types={vehicle_types}
        fileLink={fileLink}
        files={files}
        setFiles={setFiles}
        setFileLink={setFileLink}
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
