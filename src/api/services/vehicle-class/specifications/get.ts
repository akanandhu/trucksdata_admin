import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from 'src/axios/axiosInstance'
import { VehicleClassSpecParams } from 'src/types/VehicleClass'

async function getVehicleClassSpecs(params: VehicleClassSpecParams) {
  const response = axiosInstance.get('vehicle-type/specifications', {
    params: { ...params }
  })

  return response
}

export const useGetVehicleClassSpecs = (params: VehicleClassSpecParams) => {
  return useQuery({
    queryKey: ['vehicle-class-specs', params],
    queryFn: () => getVehicleClassSpecs(params)
  })
}
