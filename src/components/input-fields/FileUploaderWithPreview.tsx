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
import useCustomToast from '../toast/toast'

export interface FileProp {
  id: string
  name: string
  type: string
  data?: {
    attachment: string
  }
  size: number
  attachment: string
  thumbnail?: string
  original?: string
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
  fileLink: any
  setFiles: any
  setFileLink: any
  addFiles: any
  isMultiple?: boolean
}

const FileUploaderMultiple = (props: Props) => {
  const { files, setFiles, fileLink, setFileLink, addFiles } = props
  const dontShow = files?.[0] === null || files?.[0] === undefined
  
  // ** State
  const theme = useTheme()
  const toast = useCustomToast()

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
        toast.error('Total File Size Exceeded 10Mb')

        return
      }

        setFiles((prevFiles: any) => [...prevFiles, ...acceptedFiles.map(file => Object.assign(file))])
        for (let i = 0; i < acceptedFiles.length; i++) {
          const file = acceptedFiles[i]
          const formData = new FormData()

          // Append each file with a dynamic key
          formData.append(`attachment[${i}]`, file)

          try {
            const response = await addFiles.mutateAsync(formData)
            console.log(response?.data, 'responseCheck')
            setFileLink((prevKeys: any) => [...prevKeys, response?.data])
          } catch (error) {
            // Handle any errors that occurred during the upload
            console.error(`Error uploading file "${file.name}":`, error)
          }
        }
    }
  })

  const renderFilePreview = (file: FileProp | any) => {
    const isFileArray = Boolean(file?.length) 
    const fileToCheck = isFileArray ? file?.[0] : file
    if (fileToCheck?.name?.endsWith('jpg') || fileToCheck?.thumbnail?.endsWith('jpg') || fileToCheck?.thumbnail?.endsWith('png')) {
      return (
        <img
          width={38}
          height={38}
          alt={fileToCheck?.name || 'Image'}
          src={fileToCheck?.id ? fileToCheck?.data?.attachment : fileToCheck?.original ? fileToCheck?.original : URL.createObjectURL(fileToCheck as any)}
        />
      )
    } else {
      return <Icon fontSize={'2rem'} icon='tabler:file-description' />
    }
  }

  const handleRemoveFile = (file: FileProp, i: number) => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter((i: FileProp) => i.name !== file.name)
    setFiles([...filtered])
    const newFileLinks = [...fileLink]
    newFileLinks.splice(i, 1)
    setFileLink(newFileLinks)
  }

  const imageDatas = files?.length ? files : fileLink
  const fileList = imageDatas?.map((file: FileProp, i: number) => (
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
          {file?.size && (
            <Typography className='file-size' variant='body2'>
              {Math.round(file?.size / 100) / 10} kb
            </Typography>
          )}
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file, i)}>
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
      {files?.length && !dontShow ? (
        <div>
          <List>{fileList}</List>
        </div>
      ) : null}
    </Fragment>
  )
}

export default FileUploaderMultiple
