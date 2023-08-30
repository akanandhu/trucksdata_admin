// ** React Imports
import React, { Fragment, SetStateAction } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import Icon from 'src/@core/components/icon'
import useCustomToast from '../toast/toast'

const DeleteConfirmModal = ({
  open,
  setOpen,
  idToRemove,
  remove,
  setRemoved
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  idToRemove: string
  remove: any[]
  setRemoved?: React.Dispatch<SetStateAction<any[]>>
}) => {
  // ** State

  const toast = useCustomToast()
  const handleClose = () => setOpen(false)

  const handleSubmit = () => {
    const removed = remove.filter((obj) => obj.id !== idToRemove)
    setRemoved && setRemoved(removed)
    toast.success('Delete success')
    handleClose()
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
          Are you sure to delete ?
        </DialogTitle>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleClose}>Close</Button>
          <Button color='error' onClick={handleSubmit}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default DeleteConfirmModal
