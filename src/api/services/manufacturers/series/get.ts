import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from 'src/axios/axiosInstance'

async function getManufacturerSeries(id: number, params?: any) {
  const filterParams = {
    manufacuturer_id: id,
    ...params
  }
  const response = await axiosInstance.get(`series`, {
    params: filterParams
  })

  return response?.data
}

export const useGetManufacturerSeries = (id: number, params?: any) => {
  return useQuery({
    queryKey: ['series', id, params],
    queryFn: () => getManufacturerSeries(id, params),
    staleTime: Infinity,
    enabled: !!id
  })
}
