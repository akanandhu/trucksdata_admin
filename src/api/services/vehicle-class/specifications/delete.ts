import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from 'src/axios/axiosInstance'

export const useDeleteVehicleClassSpec = () => {
  return useMutation({
    mutationFn: ({ id }: { id: string }) => {
      return axiosInstance.delete(`/vehicle-type/specifications/${id}`)
    }
  })
}
