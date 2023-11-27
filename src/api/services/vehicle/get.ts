import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { axiosInstance } from 'src/axios/axiosInstance'
import { VehicleParamsTypes } from 'src/types/Vehicle'

function getVehicles(params: VehicleParamsTypes | null) {
  const filterParams = {
    ...params,
    page: params?.page + 1
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

async function getVehicle(id: string) {
  const response = await axiosInstance.get(`/vehicles/${id}`)

  return response
}

export const useGetVehicle = (id: string) => {
  return useQuery({
    queryKey: ['vehicle', id],
    queryFn: () => getVehicle(id),
    enabled: !!id
  })
}

async function getVehicleSpecData(vehicleId: string, specId: number) {
  const response = await axiosInstance.get(`vehicles/${vehicleId}/vehicle-specs/${specId}`)

  return response?.data
}

export const useGetVehicleSpecData = (vehicleId: string, specId: number) => {
  return useQuery({
    queryKey: ['vehicle-spec-data', vehicleId, specId],
    queryFn: () => getVehicleSpecData(vehicleId, specId),
    enabled: !!specId
  })
}

export const useGetVehicleInfinite = (params: VehicleParamsTypes | null) => {
  return useInfiniteQuery<any>({
    queryKey: ['vehicles-infinity', params],
    queryFn: ({ pageParam }) => getVehicles({ ...params, page: pageParam }),
    getNextPageParam: lastPage => {
      const nextPage = lastPage?.data?.last_page || 1

      return nextPage < lastPage?.data?.last_page ? nextPage + 1 : undefined
    },
    initialPageParam: 1
  })
}
