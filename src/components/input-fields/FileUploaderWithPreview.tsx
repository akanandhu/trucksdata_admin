// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { useTheme } from '@mui/material'
import { useAddFiles } from 'src/api/services/attachments/post'
import FallbackSpinner from 'src/@core/components/spinner'
import useCustomToast from '../toast/toast'
import { errorMessageParser } from 'src/utils/error-message-parser'

interface Props {
  value: any
  onChange: any
  multiple: boolean
  acceptFile?: boolean
  label?: string
}

// const ACCEPTED_FILE_TYPES = "image/*,application/pdf"

const getPreviewImage = (value: any) => {
  let images: any[] = []
  if (value) {
    images = Array.isArray(value) ? value : [{ ...value }]
  }

  return images
}

const FileUploaderMultiple = (props: Props) => {
  const { value, onChange, multiple, label } = props

  // ** State
  const theme = useTheme()
  const toast = useCustomToast()
  const { mutate: addFiles, isPending: loading } = useAddFiles()
  const [files, setFiles] = useState<any[]>(getPreviewImage(value))
  const formData = new FormData()
  const { getRootProps, getInputProps } = useDropzone({
    multiple,
    onDrop: async acceptedFiles => {
      acceptedFiles.map((file, i) => {
        formData.append(`attachment[${i}]`, file)
      })
      if (acceptedFiles.length) {
        addFiles(formData, {
          onSuccess: (data: any) => {
            let mergedData
            if (multiple) {
              mergedData = files.concat(data?.data)
              setFiles(mergedData)
            } else {
              mergedData = data[0]
              setFiles(mergedData)
            }
            if (onChange) {
              onChange(mergedData)
            }
          }
        })
      }
    },

    onDropRejected: fileRejections => {
      fileRejections.forEach(file => {
        file?.errors?.forEach(error => {
          toast.error(errorMessageParser(error))
        })
      })
    }
  })

  const renderFilePreview = (file: any) => {
    const isFileArray = Boolean(file?.length)
    const fileToCheck = isFileArray ? file?.[0] : file
    if (
      fileToCheck?.name?.endsWith('jpg') ||
      fileToCheck?.thumbnail?.endsWith('jpg') ||
      fileToCheck?.thumbnail?.endsWith('png')
    ) {
      return (
        <img
          width={38}
          height={38}
          alt={fileToCheck?.name || 'Image'}
          src={
            fileToCheck?.id
              ? fileToCheck?.thumbnail
              : fileToCheck?.thumbnail
              ? fileToCheck?.original
              : URL.createObjectURL(fileToCheck as any)
          }
        />
      )
    } else {
      return <Icon fontSize={'2rem'} icon='tabler:file-description' />
    }
  }

  const handleDelete = (image: { id: string }) => {
    const images = files.filter(file => file.id !== image.id)
    setFiles(images)
    if (onChange) {
      onChange(images)
    }
  }
  const fileList = Array.isArray(value) && value?.map((file: any) => (
    <ListItem
      sx={{
        marginTop: theme.spacing(3.5),
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(2.5, 2.4, 2.5, 6),
        border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(93, 89, 98, 0.14)' : 'rgba(247, 244, 254, 0.14)'}`
      }}
      key={file?.name || file?.id}
    >
      <div style={{ display: 'flex', alignItems: 'center' }} className='file-details'>
        <div style={{ display: 'flex', marginRight: theme.spacing(3.75) }} className='file-preview'>
          {renderFilePreview(file)}
        </div>
        <div>
          <Typography fontWeight={600} className='file-name'>
            {file?.name || 'Image'}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleDelete(file)}>
        <Icon icon='tabler:x' fontSize={20} />
      </IconButton>
    </ListItem>
  ))

  if (loading) {
    return <FallbackSpinner />
  }

  return (
    <Fragment>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              padding: '2px 8px',
              borderRadius: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'primary'
            }}
          >
            <Typography fontWeight={700}>Upload {label ?? 'File'}</Typography>
            {<Icon icon='tabler:upload' fontSize='1.75rem' />}
          </Box>
          <Typography sx={{ opacity: 30 }}>(Total allowed file size : 5mb)</Typography>
        </Box>
      </div>
      {value?.length ? (
        <div>
          <List>{fileList}</List>
        </div>
      ) : null}
    </Fragment>
  )
}

export default FileUploaderMultiple
