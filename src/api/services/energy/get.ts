import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from 'src/axios/axiosInstance'

async function getEnergySources() {
  const response = await axiosInstance.get('energy-sources')

  return response
}

export const useGetEnergySources = () => {
  return useQuery({
    queryKey: ['energy-sources'],
    queryFn: getEnergySources,
    staleTime: Infinity
  })
}
