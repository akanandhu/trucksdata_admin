import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from 'src/axios/axiosInstance'
import { VehicleParamsTypes } from 'src/types/Vehicle'

function getVehicles(params: VehicleParamsTypes | null) {
  const filterParams = {
    ...params
  }
  const response = axiosInstance.get(`vehicles`, {
    params: filterParams
  })

  return response
}

export const useGetVehicles = (params: VehicleParamsTypes | null) => {
  return useQuery({
    queryKey: ['vehicles', params],
    queryFn: () => getVehicles(params),
    staleTime: Infinity
  })
}
