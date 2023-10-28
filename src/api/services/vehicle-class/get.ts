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

// get - useQuery