import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { axiosInstance } from 'src/axios/axiosInstance'

function handleGetSpecs() {
  const response = axiosInstance.get('specifications')

  return response
}

export const useGetSpecsData = () => {
  return useQuery({
    queryKey: ['specifications'],
    queryFn: handleGetSpecs,
    staleTime: Infinity
  })
}

function handleGetSpecsPaginated(params: any) {
  const filterParams = {
    ...params
  }
  const response = axiosInstance.get('specifications', {
    params: filterParams
  })

  return response
}

export const useGetSpecsDataPagination = () => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['specifications-paginated'],
    queryFn: ({ pageParam }) => handleGetSpecsPaginated(pageParam),
    getNextPageParam: lastPage => lastPage.data.last_page,
    getPreviousPageParam: firstPage => firstPage.data.from
  })
}


async function getSpecView (id: number) {
  const response  = await axiosInstance.get(`specifications/${id}`)

  return response
}


export const useGetSpecView = (id: number) => {
  return useQuery({
    queryKey: ['spec-view'],
    queryFn: () =>  getSpecView(id)
  })
} 