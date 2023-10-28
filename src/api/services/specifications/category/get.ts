import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "src/axios/axiosInstance"

function handleGetSpecsCategories() {
    const response = axiosInstance.get('specification-categories')
  
    return response
  }
  
  export const useGetSpecCategories = () => {
    return useQuery({
      queryKey: ['specification-categories'],
      queryFn: handleGetSpecsCategories,
      staleTime: Infinity
    })
  }