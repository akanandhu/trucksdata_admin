import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from 'src/axios/axiosInstance'
import { VehicleTypes } from 'src/types/Vehicle'

export const useAddVehicle = () => {
  return useMutation({
    mutationFn: (values: VehicleTypes) => {
      return axiosInstance.post('vehicles', values)
    }
  })
}

export const useAddNewSpecToVehicle = () => {
  return useMutation({
    mutationFn: ({ values, vehicle_id }: { values: any; vehicle_id: number }) => {
      return axiosInstance.post(`/vehicles/${vehicle_id}/vehicle-specs`, values)
    }
  })
}
