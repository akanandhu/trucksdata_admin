import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from 'src/axios/axiosInstance'

function getUsers() {
  const response = axiosInstance.get('data-collection')

  return response
}

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    staleTime: Infinity
  })
}
