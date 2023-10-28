import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from 'src/axios/axiosInstance'
import { VehicleClassFields } from 'src/types/VehicleClass'

export const useEditVehicleClass = () => {
  return useMutation({
    mutationFn: (values: { id: string; data: VehicleClassFields }) => {
      return axiosInstance.patch(`vehicle-types/${values?.id}`, values?.data)
    }
  })
}
