import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from 'src/axios/axiosInstance'

function handleGetVehicleClass() {
  const response = axiosInstance.get('vehicle-types')

  return response
}

export const useGetVehicleClasses = () => {
  return useQuery({
    queryKey: ['vehicle-class'],
    queryFn: handleGetVehicleClass,
    staleTime: Infinity
  })
}

// view

function getVehicleClass(id: number) {
  const response = axiosInstance.get(`vehicle-types/${id}`)

  return response
}

export const useGetVehicleClass = (id: number) => {
  return useQuery({
    queryKey: ['vehicle-class-single', id],
    queryFn: () => getVehicleClass(id),
    staleTime: Infinity,
  })
}