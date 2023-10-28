import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "src/axios/axiosInstance"

async function getManufacturers () {
    const response = await axiosInstance.get('manufacturers')

    return response
}

export const useGetManufacturers = () => {
    return useQuery({
        queryKey: ['manufacturer'],
        queryFn:  getManufacturers
    })
}
