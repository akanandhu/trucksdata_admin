import { useEffect } from 'react'
import { UseFormSetValue } from 'react-hook-form';
import { SpecFields } from 'src/types/SpecFields';

const usePrefillSpec = ({ selectedData, setValue }: { selectedData: SpecFields; setValue: UseFormSetValue<SpecFields>}) => {
  useEffect(() => {
    setValue('id', selectedData?.id)
    setValue('name', selectedData?.name)
    setValue('data_type', selectedData?.data_type)
    setValue('options', selectedData?.options)
    setValue('specification_category_id', selectedData?.specification_category_id),
    (setValue('is_key_feature', selectedData?.is_key_feature))

  }, [selectedData, setValue])
}
export default usePrefillSpec
