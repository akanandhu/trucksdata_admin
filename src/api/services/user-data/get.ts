import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from 'src/axios/axiosInstance'

function getUsers(params: { page: number; pageSize: number }) {
  const filterParams = {
    ...params,
    page: params?.page + 1
  }
  const response = axiosInstance.get('data-collection', {
    params: filterParams
  })

  return response
}

export const useGetUsers = (params: { page: number; pageSize: number }) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => getUsers(params),
    staleTime: Infinity
  })
}
