import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from 'src/axios/axiosInstance'

export const useRemoveVehicle = () => {
  return useMutation({
    mutationFn: ({ id }: { id: string }) => {
      return axiosInstance.delete(`/vehicles/${id}`)
    }
  })
}
