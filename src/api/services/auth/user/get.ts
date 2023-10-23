import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from 'src/axios/axiosInstance'

async function handleGetUser() {
  const response = await axiosInstance.get('user')

  return response
}

export const useGetUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: handleGetUser,
    staleTime: Infinity
  })
}
