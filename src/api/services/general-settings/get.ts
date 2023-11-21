import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from 'src/axios/axiosInstance'

async function getPageSettings() {
  const response = await axiosInstance.get('home-page-settings')

  return response
}

export const useGetGeneralSettings = () => {
  return useQuery({
    queryKey: ['home-page'],
    queryFn: getPageSettings,
    staleTime: Infinity
  })
}
