import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "src/axios/axiosInstance"

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