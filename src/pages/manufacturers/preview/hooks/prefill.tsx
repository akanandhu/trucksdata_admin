import {  useEffect } from 'react'

const usePrefillSeries = ({
  selectedData,
  setValue,
}: {
  selectedData: any
  setValue: any
}) => {
  useEffect(() => {
    if (selectedData) {
      setValue('title', selectedData?.title ?? '')
      setValue('vehicle_type_id', selectedData?.vehicle_type_id ?? '')
      setValue('description', selectedData?.description ?? '')
    }
  }, [selectedData, setValue])
}
export default usePrefillSeries
