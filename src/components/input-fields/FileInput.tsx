import { Controller } from 'react-hook-form'
import FileUploaderMultiple from './FileUploaderWithPreview'
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'

interface FileInputProps {
  control: any
  id: string
  multiple?: boolean
  acceptFile?: boolean
  helperText?: string
  defaultValue?: any
}

const FileInput = ({ control, id, multiple = true, acceptFile = false, defaultValue = [] }: FileInputProps) => {
  return (
    <DropzoneWrapper>
      <Controller
        control={control}
        name={id}
        defaultValue={defaultValue}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        render={({ field: { ref, ...rest } }) => (
          <FileUploaderMultiple {...rest} multiple={multiple} acceptFile={acceptFile} />
        )}
      />
    </DropzoneWrapper>
  )
}

export default FileInput
