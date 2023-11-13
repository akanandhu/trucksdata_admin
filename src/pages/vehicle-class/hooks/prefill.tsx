import { useEffect } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { VehicleClassFields } from 'src/types/VehicleClass'

const usePrefillVehicleClass = ({
  selectedData,
  setValue
}: {
  selectedData: VehicleClassFields
  setValue: UseFormSetValue<VehicleClassFields>
}) => {
  const energySources = selectedData?.energy_sources

  useEffect(() => {
    setValue('name', selectedData?.name)
    setValue('energy_sources', selectedData?.energy_sources)
    setValue('status', selectedData?.status)
  }, [energySources, selectedData, setValue])
}
export default usePrefillVehicleClass
