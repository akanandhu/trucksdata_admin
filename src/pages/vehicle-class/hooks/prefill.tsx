import { useEffect } from 'react'
import { UseFormSetValue } from 'react-hook-form';
import { VehicleClassFields } from 'src/types/VehicleClass'

const usePrefillVehicleClass = ({ selectedData, setValue }: { selectedData: VehicleClassFields; setValue: UseFormSetValue<VehicleClassFields>}) => {
  useEffect(() => {
    setValue('title', selectedData?.title)
    setValue('status', selectedData?.status)
  }, [selectedData, setValue])
}
export default usePrefillVehicleClass
