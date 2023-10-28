import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from 'src/axios/axiosInstance'
import { ManufacturersFields } from 'src/types/Manufacturers'

export const useEditVehicleClass = () => {
  return useMutation({
    mutationFn: (values: { id: string; data: ManufacturersFields }) => {
      return axiosInstance.patch(`manufacturers/${values?.id}`, values?.data)
    }
  })
}
