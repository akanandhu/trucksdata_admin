import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from 'src/axios/axiosInstance'

export const useRemoveVehicle = () => {
  return useMutation({
    mutationFn: ({ id }: { id: string }) => {
      return axiosInstance.delete(`/vehicles/${id}`)
    }
  })
}

export const useDeleteVehicleSpecs = (vehicleId: number) => {
  return useMutation({
    mutationFn: ({ id }: { vehicleId: number; id: number }) => {
      return axiosInstance.delete(`vehicles/${vehicleId}/vehicle-specs/${id}`)
    }
  })
}

export const useRemoveSpecValueFromVehicle = (vehicleSpecId: number) => {
  return useMutation({
    mutationFn: ({ id }: { id: number }) => {
      return axiosInstance.delete(`vehicle-specs/${vehicleSpecId}/values/${id}`)
    }
  })
}
