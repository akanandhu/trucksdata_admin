import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from 'src/axios/axiosInstance'

async function getManufacturers() {
  const response = await axiosInstance.get('manufacturers')

  return response
}

export const useGetManufacturers = () => {
  return useQuery({
    queryKey: ['manufacturer'],
    queryFn: getManufacturers,
    staleTime: Infinity
  })
}

async function getManufacturer(id: number) {
  const filterParams = {
    id
  }
  const response = await axiosInstance.get(`manufacturers`, {
    params: filterParams
  })

  return response
}

export const useGetManufacturer = (id: number) => {
  return useQuery({
    queryKey: ['manufacturer-single', id],
    queryFn: () => getManufacturer(id),
    staleTime: Infinity
  })
}



