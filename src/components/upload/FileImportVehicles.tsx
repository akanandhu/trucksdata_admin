import { Fragment, SetStateAction } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { useDropzone } from 'react-dropzone'
import ButtonSpinner from '../spinner/ButtonSpinner'

interface FileProp {
  name: string
  type: string
  size: number
}



interface Props {
  files: any[]
  setFiles: React.Dispatch<SetStateAction<any[]>>
  errorToggle: () => void
  isLoading: boolean
}

const FileImportVehicles = (props: Props) => {
  const { files, setFiles, errorToggle, isLoading } = props

  // ** Hooks
  const theme = useTheme()

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 2,
    maxSize: 2000000,
    accept: {
      'worksheet/*': ['.xlsx', '.xls']
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    },
    onDropRejected: () => {
      errorToggle()
    }
  })

  const renderFilePreview = (file: FileProp) => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file as any)} />
    } else {
      return <Icon fontSize={'2rem'} icon='tabler:file-description' />
    }
  }

  const handleRemoveFile = (file: FileProp) => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter((i: FileProp) => i.name !== file.name)
    setFiles([...filtered])
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
        <input type='worksheet/*' accept='.xlsx, .xls' {...getInputProps()} />
        <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
          {isLoading ? <ButtonSpinner /> : <Icon icon={'tabler:upload'} fontSize={'2rem'} />}
          <Typography variant='h5' sx={{ mb: 2.5 }}>
            Drop files here or click to import.
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>Allowed only excel files</Typography>

          {/* <Typography sx={{ color: 'text.secondary' }}>Max 2 files and max size of 2 MB</Typography> */}
        </Box>
      </div>

      {files.length ? (
        <Fragment>
          <List>{fileList}</List>
        </Fragment>
      ) : null}
    </Fragment>
  )
}

export default FileImportVehicles
