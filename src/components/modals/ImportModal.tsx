// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import useCustomToast from 'src/lib/toast'
import { Grow } from '@mui/material'
import { errorMessageParser } from 'src/utils/error-message-parser'
import { useQueryClient } from '@tanstack/react-query'
import { useImportVehicle } from 'src/api/services/vehicle/post'
import FileImportVehicles from '../upload/FileImportVehicles'

const ImportVehicleModal = ({
  open,
  setOpen
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  // ** State
  const [files, setFiles] = useState<any>([])

  const toast = useCustomToast()
  const errorFunction = () => {
    setOpen(false)
    toast.error('Please follow upload format')
  }
  const handleClose = () => {
    setOpen(false)
    setFiles([])
  }

  const formData = new FormData()
  const queryClient = useQueryClient()
  const importVehicles = useImportVehicle()

  const handleSubmit = () => {
    formData.append(`file`, files?.[0])
    importVehicles.mutate(
      { values: formData },
      {
        onSuccess: () => {
          toast.success('Vehicle Imported Successfully')
          queryClient.invalidateQueries({ queryKey: ['vehicles'] })
          handleClose()
        },
        onError: (err: any) => {
          handleClose()
          toast.error(errorMessageParser(err))
        }
      }
    )
  }

  return (
    <Fragment>
      <Dialog
        open={open}
        TransitionComponent={Grow}
        disableEscapeKeyDown
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        onClose={() => {
          handleClose()
        }}
        fullWidth={true}
        maxWidth={'xs'}
      >
        <DialogTitle style={{ marginBottom: '2rem' }} id='alert-dialog-title'>
          <FileImportVehicles
            isLoading={importVehicles?.isPending}
            files={files}
            setFiles={setFiles}
            errorToggle={errorFunction}
          />
        </DialogTitle>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleClose}>Close</Button>
          <Button
            disabled={importVehicles.isPending || files.length === 0}
            color='primary'
            variant='contained'
            onClick={handleSubmit}
          >
            Import
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default ImportVehicleModal
