import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from 'src/axios/axiosInstance'
import { VehicleTypes } from 'src/types/Vehicle'

export const useUpdateVehicle = () => {
  return useMutation({
    mutationFn: (values: { id: string; data: VehicleTypes }) => {
      return axiosInstance.patch(`vehicles/${values?.id}`, values?.data)
    }
  })
}

export const useUpdateSpecToVehicle = () => {
  return useMutation({
    mutationFn: (values: { id: number; spec_id: number; data: VehicleTypes }) => {
      return axiosInstance.patch(`vehicle-specs/${values?.id}/values/${values.spec_id}`, values?.data)
    }
  })
}
