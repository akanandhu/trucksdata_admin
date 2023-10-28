// ** React Imports
import { Fragment } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import Icon from 'src/@core/components/icon'
import { errorMessageParser } from 'src/@core/utils/error'
import useCustomToast from 'src/lib/toast'
import { useQueryClient } from '@tanstack/react-query'

const DeleteConfirmModal = ({
  open,
  remove,
  setOpen,
  routeToInvalidate,
  idToRemove,
  optionalRouteToInvalidate,
  deleteLabel,
  successMessage
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  remove: any
  idToRemove: string
  routeToInvalidate: string
  optionalRouteToInvalidate?: string
  thirdRouteToInvalidate?: string
  fourthOptionalInvalidate?: string
  deleteLabel?: string
  successMessage?: string
}) => {
  // ** State

  const toast = useCustomToast()
  const handleClose = () => setOpen(false)
  const queryClient = useQueryClient()

  const handleSubmit = () => {
    const data = {
      id: idToRemove
    }

    remove.mutate(data, {
      onSuccess: () => {
        toast.success(`${successMessage ?? 'Delete success'}`)
        handleClose()
        queryClient.invalidateQueries({queryKey: [routeToInvalidate]})
        queryClient.invalidateQueries({queryKey: [optionalRouteToInvalidate]})
      },
      onError: (err: any) => {
        const errMsg = errorMessageParser(err)
        toast.error(errMsg)
        handleClose()
      }
    })
  }

  return (
    <Fragment>
      <Dialog
        open={open}
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
          <Icon
            icon='tabler:trash'
            color='error'
            style={{ position: 'relative', top: '3px', marginRight: '6px', color: 'rgb(234, 84, 85)' }}
            fontSize='1.5rem'
          />
          {deleteLabel ?? 'Are you sure to delete ?'}
        </DialogTitle>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleClose}>Close</Button>
          <Button disabled={remove.isLoading} color='error' onClick={handleSubmit}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default DeleteConfirmModal
