import { SetStateAction, useEffect } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { ManufacturersFields } from 'src/types/Manufacturers'

const usePrefillManufacturer = ({
  selectedData,
  setValue,
  setFileLink,
  setFiles
}: {
  selectedData: ManufacturersFields
  setValue: UseFormSetValue<ManufacturersFields>
  setFileLink: React.Dispatch<SetStateAction<any[]>>
  setFiles: React.Dispatch<SetStateAction<any[]>>
}) => {
  useEffect(() => {
    if (selectedData) {
      const vehicleTypeNames = selectedData?.vehicle_types?.map(vehicle_type => vehicle_type?.name)
      const logo = [selectedData?.logo] ?? []
      setValue('name', selectedData?.name)
      setValue('vehicle_types', vehicleTypeNames)
      setValue('description', selectedData?.description)
      setFileLink(logo)
      setFiles(logo)
      
    }
  }, [selectedData, setFileLink, setFiles, setValue])
}
export default usePrefillManufacturer
