import { useEffect } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { ManufacturersFields } from 'src/types/Manufacturers'

const usePrefillManufacturer = ({
  selectedData,
  setValue
}: {
  selectedData: ManufacturersFields
  setValue: UseFormSetValue<ManufacturersFields>
}) => {
  useEffect(() => {
    if (selectedData) {
      const vehicleTypeNames = selectedData?.vehicle_types?.map(vehicle_type => vehicle_type?.name)
      const logo = selectedData?.logo ?? []
      setValue('name', selectedData?.name)
      setValue('vehicle_types', vehicleTypeNames)
      setValue('description', selectedData?.description)
      setValue('logo', logo || null)
    }
  }, [selectedData, setValue])
}
export default usePrefillManufacturer
