// ** React Imports
import { Fragment } from 'react'

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

export interface FileProp {
  id: string
  name: string
  type: string
  data?: {
    attachment: string
  }
  size: number
  attachment: string
  spec: {
    contentType: string
    name: string
  }
}

export interface AttachDataProps {
  status: boolean
  data: [
    {
      attachment: string
      attachment_name: string
      id: string
      invoice_id: string
      spec: {
        name: string
        contentType: string
      }
    }
  ]
}

interface Props {
  files: any
  setFiles: any
}

const FileUploaderMultiple = (props: Props) => {
  const { files, setFiles,   } = props
  console.log({
    files,
    setFiles,

  })

  // ** State
  const theme = useTheme()

  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles: File[]) => {
      const existingFilesTotalSize = files?.reduce(
        (
          acc: number,
          file: {
            size?: number
            data?: {
              attachment_size: number
            }
          }
        ) => {
          if (file?.size) {
            return acc + file?.size
          } else {
            return acc + (file?.data?.attachment_size ?? 0)
          }
        },
        0
      )

      const currentlySelectedFileSize = acceptedFiles?.reduce((acc, file) => acc + file?.size ?? 0, 0)
      const totalFileSize = existingFilesTotalSize + currentlySelectedFileSize

      const maxSize = 10 * 1024 * 1024 // 5MB in bytes

      if (totalFileSize > maxSize) {
        // toast.error('Total File Size Exceeded 10Mb')

        return
      }

      setFiles((prevFiles: any) => [...prevFiles, ...acceptedFiles.map(file => Object.assign(file))])

    }
  })

  const renderFilePreview = (file: FileProp) => {
    if (file?.name?.endsWith('jpg') || file?.name?.endsWith('png')) {
      return (
        <img
          width={38}
          height={38}
          alt={file.name}
          src={file.id ? file?.data?.attachment : URL.createObjectURL(file as any)}
        />
      )
    } else {
      return <Icon fontSize={'2rem'} icon='tabler:file-description' />
    }
  }

  const handleRemoveFile = (file: FileProp) => {
    if (file.id) {
      // deleteFile.mutate(file.id)
    }
    const uploadedFiles = files
    const filtered = uploadedFiles.filter((i: FileProp) => i.name !== file.name)
    setFiles([...filtered])

    // const newFileLinks = [...fileLink] // Make a copy of the fileLinks array
    // newFileLinks.splice(index, 1) // Remove the file link at the specified index
    // setFileLink(newFileLinks)
  }

  const fileList = files.map((file: FileProp) => (
    <ListItem
      sx={{
        marginTop: theme.spacing(3.5),
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(2.5, 2.4, 2.5, 6),
        border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(93, 89, 98, 0.14)' : 'rgba(247, 244, 254, 0.14)'}`
      }}
      key={file.name}
    >
      <div style={{ display: 'flex', alignItems: 'center' }} className='file-details'>
        <div style={{ display: 'flex', marginRight: theme.spacing(3.75) }} className='file-preview'>
          {renderFilePreview(file)}
        </div>
        <div>
          <Typography fontWeight={600} className='file-name'>
            {file.name}
          </Typography>
          {file?.size && (
            <Typography className='file-size' variant='body2'>
              {Math.round(file.size / 100) / 10} kb
            </Typography>
          )}
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <Icon icon='tabler:x' fontSize={20} />
      </IconButton>
    </ListItem>
  ))


  return (
    <Fragment>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Box
            sx={{
              // mb: 8.75,
              // width: 48,
              // height: 48,
              display: 'flex',
              gap: 2,
              padding: '2px 8px',
              borderRadius: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'primary'
            }}
          >
            <Typography fontWeight={700}>Upload File</Typography>
            {<Icon icon='tabler:upload' fontSize='1.75rem' />}
          </Box>
          <Typography sx={{ opacity: 30 }}>(Total allowed file size : 5mb)</Typography>
        </Box>
      </div>
      {files.length ? (
        <div>
          <List>{fileList}</List>
        </div>
      ) : null}
    </Fragment>
  )
}

export default FileUploaderMultiple
